const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://eshop-bak.iran.liara.run/",
      changeOrigin: true,
    })
  );
};
