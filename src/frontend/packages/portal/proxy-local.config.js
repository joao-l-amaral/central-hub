module.exports = {
  '/assets/shelveProducts': {
    target: 'http://localhost:4201',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/assets/shelveProducts': '/assets' },
  },
  '/assets/gameQ': {
    target: 'http://localhost:4202',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/assets/gameQ': '/assets' },
  },
  '/assets/cardBinder': {
    target: 'http://localhost:4203',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/assets/cardBinder': '/assets' },
  },
  '/api': {
    target: 'http://localhost:8088',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/auth': {
    target: 'http://localhost:8088',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/realms': {
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};


