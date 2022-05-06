import React from "react";
import { Headline, List, Slide, SubHeadline, Image, Text } from "../components";
import { Editor } from "../utils/editor";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";

export function Microfrontends() {
  return (
    <SlideControl>
      <Slide>
        <Headline>Microfrontends</Headline>
      </Slide>
      <Microservices />
      <MicrofrontendsArch />
    </SlideControl>
  );
}

function Microservices() {
  return (
    <Slide>
      <SubHeadline>Backend microservices</SubHeadline>
      <Excalidraw
        content={require("../graphics/microservices.json")}
        path={require.resolve("../graphics/microservices.json")}
        edit
      />
    </Slide>
  );
}

function MicrofrontendsArch() {
  return (
    <Slide>
      <SlideControl reveal>
        <SubHeadline>Let's do the same on frontend</SubHeadline>
        <Excalidraw
          content={require("../graphics/microfrontends.json")}
          path={require.resolve("../graphics/microfrontends.json")}
          edit
        />
      </SlideControl>
    </Slide>
  );
}
