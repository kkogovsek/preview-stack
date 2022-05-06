import React from "react";
import Monacco from "@monaco-editor/react";

export function Editor({ value = "", language = "javascript" }) {
  return (
    <Monacco
      height="60vh"
      defaultLanguage={language}
      defaultValue={value}
      theme="vs-dark"
      options={{
        fontSize: 20,
      }}
    />
  );
}
