import React from "react";
import tw from "tw";
import { RemoteComponent } from "./loader";

export default function App() {
  return (
    <div>
      <El>Hello World</El>
      {/* <RemoteComponent
        system={{
          module: "./entry",
          scope: "federated_preview_slide",
          url: "http://localhost:1338/container.js",
        }}
      /> */}
      <RemoteComponent
        system={{
          module: "./entry",
          scope: "federated_preview_slide",
          url: "https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/1/preview-slide/container.js",
        }}
      />
    </div>
  );
}

const El = tw.div`text-red-600`;

// https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/1/preview-slide/container.js
