const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://j9c109.p.ssafy.io:8081',
      changeOrigin: true,
    })
  );
};