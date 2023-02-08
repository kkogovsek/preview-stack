const generate = require("webpack-config");

module.exports = generate({
  entry: "./src/index.tsx",
  port: 1338,
  container: "federated_slide_deck",
  pullRequestContainer: true,
  localFsPath: __dirname,
});
