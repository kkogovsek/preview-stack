export const demo_0_init_sharing = `await __webpack_init_sharing__("default");`;

export const demo_1_load_script = `const element = document.createElement("script");

element.src = "http://localhost:4001/container.js";
element.type = "text/javascript";
element.async = true;

element.onload = // Resolve the promise

document.head.appendChild(element);
`;

export const demo_2_get_module = `const container = window["remote_app"];
await container.init(__webpack_share_scopes__.default);
const factory = await container.get("./entry");
const Module = factory();
return Module;`;

export const demo_3_webpack = `new webpack.container.ModuleFederationPlugin({
  name: "remote_app",
  filename: "container.js",
  exposes: {
    "./entry": "./src/App.js",
  },
  shared: [
    {
      react: { singleton: true, eager: true },
      "react-dom": { singleton: true, eager: true },
    },
  ],
})`;
