    let currentCurrency = 'INR';
    let currentCurrencySymbol = '₹';
    let currencyMultiplier = 1.0;

    let scene, camera, renderer, controls;
    let roomWidth = 3.2, roomDepth = 2.8, roomHeight = 2.6; // in meters (10.5 ft x 9.2 ft)
    let floorMesh, backWallMesh, leftWallMesh, rightWallMesh, frontWallMesh;
    let roomWallDefinitions = [];
    let doorGroup, plumbingGroup;
    let clearanceGroup, wetWallGroup, floorplan2DGroup;
    let isClearanceVisible = true;
    let isWetWallActive = false;
    let currentLightingMode = 'day';
    let currentKelvin = 4000;
    let roomAmbLight, roomKeySun, roomFillLight, roomBackWallSpot;
    let gridHelper;
    let dragPlane;
    const placedProducts = [];
    let activeSelectedObject = null;
    let currentWorkflowStep = 'furnish';
    let currentViewMode = '3d';

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let dragOffset = new THREE.Vector3();
