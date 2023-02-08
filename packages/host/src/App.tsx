import React, { Suspense } from "react";
import tw from "tw";
// import SlideDeck from "slide-deck";
import styled from "styled-components";
import { RemoteComponent } from "./loader";
import { Previews } from "./previews";

const slideDeckSystem = {
  module: "./entry",
  scope: "federated_slide_deck",
  url: "https://localhost:1338/container.js",
} as const;

export const previewSlideSystem = {
  module: "./entry",
  scope: "federated_preview_slide",
  url: "https://localhost:1339/container.js",
} as const;

export default function App() {
  return (
    <Grid
      className="bg-black"
      onDoubleClick={function (event) {
        event.currentTarget.requestFullscreen?.();
        event.currentTarget.webkitRequestFullscreen?.();
      }}
    >
      <div style={{ position: "relative" }}>
        {/* <SlideDeck /> */}
        <Suspense fallback={null}>
          <RemoteComponent system={slideDeckSystem} />
        </Suspense>
      </div>
      <PreviewsContainer>
        <Previews />
      </PreviewsContainer>
    </Grid>
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
