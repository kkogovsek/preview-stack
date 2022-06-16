import React from "react";
import { Headline, List, Slide, SubHeadline, Image, Text } from "../components";
import { Editor } from "../utils/editor";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";
import devito from "./assets/nope.gif";
import { webpackReactScripts } from "./assets/code/tools-webpack";
import {
  metaWebpackConfig,
  minimalWebpackConfig,
} from "./assets/code/webpack-minimal";

export function WebpackSlides() {
  return (
    <SlideControl>
      <Slide>
        <Headline>Webpack</Headline>
      </Slide>
      <Explainer />
      <ReactScriptsMeme />
      <ReactScripts />
      <StartSmall />
      <ItGrows />
      <BundleSize />
    </SlideControl>
  );
}

function ReactScriptsMeme() {
  return (
    <Slide>
      <SlideControl reveal>
        <Text bg="green">
          <code># npm run eject</code>
        </Text>
        <Text bg="red">
          <code>Running react-scripts eject</code>
          <br />
          <code>💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥</code>
        </Text>
        <Image src={devito} />
      </SlideControl>
    </Slide>
  );
}

function Explainer() {
  return (
    <Slide bg="green">
      <SlideControl reveal>
        <SubHeadline>
          Webpack is a module bundler - everything is treated as module
        </SubHeadline>
        <Excalidraw
          key="org"
          content={require("../graphics/webpack-overview.json")}
          path={require.resolve("../graphics/webpack-overview.json")}
          edit
        />
      </SlideControl>
    </Slide>
  );
}

export function ReactScripts() {
  return (
    <Slide>
      <SubHeadline bg="yellow">How is this better?</SubHeadline>
      <Editor value={webpackReactScripts} />
    </Slide>
  );
}

export function StartSmall() {
  return (
    <Slide>
      <SubHeadline bg="red">Start small</SubHeadline>
      <Editor value={minimalWebpackConfig} />
    </Slide>
  );
}

export function ItGrows() {
  return (
    <Slide>
      <SubHeadline bg="green">
        🚨 Spoiler alert 🚨 It's going to grow anyway
      </SubHeadline>
      <Editor value={metaWebpackConfig} language="typescript" />
    </Slide>
  );
}

function BundleSize() {
  return (
    <Slide>
      <SubHeadline bg="purple">
        And so will your code &amp; bundle anyway
      </SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/bundle.json")}
        path={require.resolve("../graphics/bundle.json")}
        edit
      />
    </Slide>
  );
}
