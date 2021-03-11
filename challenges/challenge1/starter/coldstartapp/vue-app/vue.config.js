module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7071',
        ws: true,
        changeOrigin: true,
      },
    },
    before(app) {
      app.get('/.auth/me', (req, res) => {
        res.json({
          clientPrincipal: {
            identityProvider: 'identityProvider',
            userId: 'userId',
            userDetails: 'userDetails',
            userRoles: [
              'anonymous',
              'authenticated',
            ],
          },
        });
      });
    },
  },
};
