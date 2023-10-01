const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://j9c109.p.ssafy.io',
      // target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );
};