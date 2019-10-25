const { resolve } = require('path');

module.exports = function axiosPerfModule(options) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    mode: 'server',
    options,
  });

  this.nuxt.hook('render:routeDone', (_, __, { req: { perf } }) => {
    if (perf && perf.length) {
      console.table(perf);
    }
  });
};
