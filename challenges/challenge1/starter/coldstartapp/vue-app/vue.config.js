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
    before: function (app, server, compiler) {
      app.get('/.auth/me', function (req, res) {
        res.json({
          'clientPrincipal': {
            'identityProvider': 'identityProvider',
            'userId': 'userId',
            'userDetails': 'userDetails',
            'userRoles': [
              'anonymous',
              'authenticated'
            ]
          }
        });
      });
    },
  },
};
