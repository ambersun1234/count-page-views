const path = require("path");
const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/server.ts",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: ["/node_modules/"],
        use: ["ts-loader"]
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new JavaScriptObfuscator(
      {
        rotateStringArray: true
      },
      ["exclude_bundle.js"]
    )
  ],
  output: {
    filename: "./server.js",
    path: path.resolve(__dirname, "./dist")
  }
};
