import React from "react";
import tw from "tw";
import SlideDeck from "slide-deck";
import styled from "styled-components";
import { RemoteComponent } from "./loader";
import { Previews } from "./previews";

export default function App() {
  return (
    <Grid className="bg-black">
      <div style={{ position: "relative" }}>
        <SlideDeck />
      </div>
      {/* {
        <RemoteComponent
          system={{
            module: "./entry",
            scope: "federated_preview_slide",
            url: "http://localhost:1338/container.js",
          }}
        />
      }*/}
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
  & > * {
    height: 20vh;
    overflow: hidden;
  }
`;

// https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/1/preview-slide/container.js
