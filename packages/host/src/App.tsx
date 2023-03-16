import React, { Suspense } from "react";
import tw from "tw";
// import SlideDeck from "slide-deck";
import styled from "styled-components";
import { RemoteComponent } from "./loader";
import { Previews } from "./previews";
import { useCommits } from "./use-commits";
import { CommitSelector, SystemProvider, useSystem } from "./commit-selector";

export const previewSlideSystem = {
  name: "Local",
  module: "./entry",
  scope: "federated_preview_slide",
  url: "https://localhost:1337/proxy/preview-slide/container.js",
} as const;

export const localEditor = {
  name: "Editor",
  module: "./entry",
  scope: "federated_editor",
  url: "https://localhost:1337/proxy/editor/container.js",
} as const;

function AppWithSystem() {
  const [system] = useSystem();
  return (
    <>
      <Grid
        className="bg-black"
        onDoubleClick={function (event) {
          event.currentTarget.requestFullscreen?.();
          event.currentTarget.webkitRequestFullscreen?.();
        }}
      >
        <div style={{ position: "relative" }}>
          {/* <SlideDeck /> */}
          {system && (
            <Suspense fallback={null}>
              <RemoteComponent system={system} />
            </Suspense>
          )}
        </div>
        <PreviewsContainer>
          <Previews />
        </PreviewsContainer>
      </Grid>
      {/* <Suspense fallback={null}>
        <RemoteComponent system={localEditor} />
      </Suspense> */}
      <CommitSelector />
    </>
  );
}

export default function App() {
  return (
    <SystemProvider>
      <AppWithSystem />
    </SystemProvider>
  );
}

const El = tw.div`text-red-600`;
const Grid = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 80vw 20vw;
  grid-template-rows: 100vh;
`;

const PreviewsContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  & > * {
    flex-shrink: 0;
    height: 250px;
    overflow: hidden;
  }
`;

const Qr = styled.img`
  width: 20vh;
  height: 20vh;
  position: fixed;
  bottom: 16px;
  right: 16px;
`;
