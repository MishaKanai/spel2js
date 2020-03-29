const path = require("path"); // eslint-disable-line

module.exports = {
  mode: "production",
  entry: {
    spel2js: "./src/index.ts",
    "spel2js.min": "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "_bundles"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "Spel2JS",
    umdNamedDefine: true
  },

  resolveLoader: {
    modules: [path.join(__dirname, "node_modules")]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [path.join(__dirname, "node_modules")]
  },

  // Source maps support ('inline-source-map' also works)
  devtool: "source-map",
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
};
