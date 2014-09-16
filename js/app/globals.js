define({
    requestAnimationFrame: null,
    now: null,
    delta: null,
    then: null, // timestamp
    startTS: null, // timestamp
    pauseTS: null, // ts milliseconds
    secPlayed: null, // sec
    // Objects
    car: null,
    walls: null,
    defaultWall: null,
    wallsVertSpace: null,
    // Counter
    wallsAvoided: null,
    // Pause and game over states
    isGameOver: null,
    isPaused: null,
    pauseTimeoutId: null,
    // Keys
    keysUp: null,
    keysDown: null,
    // Images
    images: null,
    isAllImagesLoaded: null,
    // Speed
    initialSpeed: null,
    speedProportion: null,
    speedIncreaseOverTime: null,
    maxSpeed: null,
    resultedSpeed: null
});
