const generate = require("webpack-config");

module.exports = generate({
  entry: "./src/index.tsx",
  port: 1337,
  template: "./public/index.html",
});
