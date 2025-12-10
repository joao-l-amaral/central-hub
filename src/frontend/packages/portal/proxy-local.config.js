module.exports = {
    "/assets/shelveProducts": {
        "target": "http://localhost:4201",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/shelveProducts": "/assets" }
    },
    "/assets/sample": {
        "target": "http://localhost:4203",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug",
        "pathRewrite": { "^/assets/sample": "/assets" }
    },
    "/shelve/api": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
};


