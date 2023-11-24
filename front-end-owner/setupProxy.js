const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_TARGET_IP,
      // target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );
};