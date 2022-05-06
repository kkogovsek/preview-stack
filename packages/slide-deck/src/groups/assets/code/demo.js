export const demo_0_init_sharing = `await __webpack_init_sharing__("default");`;

export const demo_1_load_script = `const element = document.createElement("script");

element.src = 'http://localhost:5001/container.js';
element.type = "text/javascript";
element.async = true;

element.onload = () => // Do something

document.head.appendChild(element);
`;

export const demo_2_get_module = `const container = window["remote_module"];
await container.init(__webpack_share_scopes__.default);
const factory = await container.get(module);
const Module = factory();`;
