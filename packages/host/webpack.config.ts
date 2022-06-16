const generate = require("webpack-config");

module.exports = generate({
  entry: "./src/index.tsx",
  port: 1337,
  template: "./public/index.html",
  copy: [
    {
      from: "../../node_modules/@excalidraw/excalidraw/dist/excalidraw-assets",
      to: "assets/excalidraw-assets",
    },
    {
      from: "../../node_modules/@excalidraw/excalidraw/dist/excalidraw-assets-dev",
      to: "assets/excalidraw-assets-dev",
    },
  ],
  localFsPath: __dirname,
  container: `slide_host`,
});
