import React from "react";
import ExcalidrawComponent from "@excalidraw/excalidraw";
import { resolve } from "path";
import tw from "tw";

const SIZE = [1500, 700];
const [SIZE_X, SIZE_Y] = SIZE;

export function Excalidraw({ edit = false, content, path }) {
  const valueRef = React.useRef(content);
  const excalidrawRef = React.useRef();

  const save = () => {
    fetch(`http://localhost:7331${resolve(LOCAL_BASE, path)}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(valueRef.current),
    });
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          flexShrink: 0,
          position: "relative",
          width: "100%",
        }}
      >
        {edit && (
          <div className="flex gap-2 my-1 justify-end">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  JSON.stringify(valueRef.current, null, 2)
                )
              }
            >
              copy
            </Button>
            <Button onClick={save}>save</Button>
          </div>
        )}
        <ExcalidrawComponent
          ref={excalidrawRef}
          minimal
          initialData={valueRef.current}
          onChange={(elements) => {
            valueRef.current = { elements };
          }}
          viewModeEnabled={!edit}
          zenModeEnabled={!edit}
          theme="dark"
        />
      </div>
    </>
  );
}

const Button = tw.button`border border-white rounded-lg py-1 px-2 `;
