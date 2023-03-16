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
      <Slide>
        <SubHeadline>How to build them?</SubHeadline>
        <List>
          <li>{`<iframe /> 😱`}</li>
          <li>Server side composition (HTMX)</li>
          <li>Server side routing (ex. nginx)</li>
          <li>Astro, single-spa</li>
          <li>Webpack Module Federation</li>
        </List>
      </Slide>
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
