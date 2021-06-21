const path = require("path");

module.exports = {
  transpileDependencies: ["d3-scale", "d3-array", "cash-dom"],
  devServer: {
    port: 18000,
  },

  pwa: {
    name: "OpenSlot studio",
    short_name: "OpenSlot",
    start_url: ".",
    themeColor: "#303841",
    msTileColor: "#ff006e",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#ffffff",
      start_url: ".",
    },
    workboxOptions: {
      exclude: [
        /\.map$/,
        /^manifest.*\.js(?:on)?$/,
        /\.js$/,
        /\.css$/,
        /\.html$/,
      ],
      skipWaiting: true,
    },
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/styles/utilities.less")],
    },
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
