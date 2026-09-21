// Vercel Serverless Function: POST /api/groq/recommend
const https = require('https');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', message: 'Kohler AI Spatial Recommender API Active' });
  }

  try {
    const body = req.body || {};
    const notes = body.notes || body.prompt || '';
    const budget = Number(body.budget) || 350000;
    const theme = body.theme || 'Minimalist Modern';
    const inclusions = body.inclusions || { toilet: true, vanity: true, shower: true, mirror: true, tub: false };
    const dimensions = body.dimensions || '10.5 ft x 9.2 ft';

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Return 200 with fallback signal so client-side Pareto optimizer executes seamlessly
      return res.status(200).json({
        fallback: true,
        message: 'Groq API key not set in Vercel environment. Falling back to client-side Pareto optimizer.'
      });
    }

    const postData = JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are the Kohler AI Bathroom Designer. Output valid JSON recommendations for Kohler fixtures.'
        },
        {
          role: 'user',
          content: `Design a ${theme} Kohler bathroom suite. Budget: INR ${budget}. Notes: "${notes}". Room: ${dimensions}.`
        }
      ],
      temperature: 0.2,
      max_tokens: 1024,
      response_format: { type: 'json_object' }
    });

    const options = {
      hostname: 'api.groq.com',
      port: 443,
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 12000
    };

    const groqResponse = await new Promise((resolve, reject) => {
      const gReq = https.request(options, (gRes) => {
        let data = '';
        gRes.on('data', chunk => data += chunk);
        gRes.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (e) {
            resolve({ error: 'Failed to parse Groq response' });
          }
        });
      });
      gReq.on('error', err => resolve({ error: err.message }));
      gReq.on('timeout', () => {
        gReq.destroy();
        resolve({ error: 'Groq request timed out' });
      });
      gReq.write(postData);
      gReq.end();
    });

    return res.status(200).json(groqResponse);
  } catch (err) {
    return res.status(200).json({ fallback: true, error: err.message });
  }
};
