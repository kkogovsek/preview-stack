import React from "react";
import "./base.css";
import { WebContainer, WebContainerProcess } from "@webcontainer/api";

async function readProcess(process: WebContainerProcess) {
  const reader = process.output.getReader();
  while (true) {
    const res = await reader.read();
    console.log(res.value);
    if (res.done) break;
  }
}

export default function Editor() {
  React.useEffect(() => {
    async function run() {
      console.time("container");
      console.log("Downloading");
      const fileTree = await fetch("http://localhost:7331/").then((res) =>
        res.json()
      );
      console.timeStamp("container");

      console.log("Booting up");
      const webcontainerInstance = await WebContainer.boot();
      console.timeStamp("container");
      console.log("Mounting files");
      await webcontainerInstance.mount(fileTree);
      console.timeStamp("container");

      console.log("Running install");
      const installProcess = await webcontainerInstance.spawn("npm", [
        "install",
      ]);
      console.timeStamp("container");

      const installExitCode = await installProcess.exit;
      readProcess(installProcess);
      console.timeStamp("container");

      console.log("Running npm browser");
      const startProcess = await webcontainerInstance.spawn("npm", [
        "run",
        "browser",
      ]);
      readProcess(startProcess);
      webcontainerInstance.on("server-ready", (port, url) =>
        console.log(url, port)
      );
    }
    run();
  }, []);

  return (
    <div className="fixed bottom-2 left-2 w-[30vw] h-[30vh] bg-pink-500">
      50
    </div>
  );
}
