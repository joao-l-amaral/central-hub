module.exports = {
    "/assets/shelveProducts": {
        "target": "http://localhost:4201",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/shelveProducts": "/assets" }
    },
    "/assets/gameVault": {
        "target": "http://localhost:4202",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/gameVault": "/assets" }
    },
    "/assets/sample": {
        "target": "http://localhost:4203",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/sample": "/assets" }
    },
    "/**/api/*": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
};


