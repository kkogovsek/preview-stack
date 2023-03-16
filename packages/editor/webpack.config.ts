const generate = require("webpack-config");

module.exports = generate({
  entry: "./src/index.tsx",
  port: 1340,
  container: "federated_editor",
  pullRequestContainer: true,
  localFsPath: __dirname,
});
