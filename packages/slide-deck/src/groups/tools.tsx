import React from "react";
import { Headline, List, Slide, SubHeadline, Image, Text } from "../components";
import { Editor } from "../utils/editor";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";
import {
  exampleGruntfile,
  exampleGulpfile,
} from "./assets/code/frontend-tools";
import futurama from "./assets/futurama.png";

export function Tools() {
  return (
    <SlideControl>
      <Slide>
        <Headline>Tools</Headline>
      </Slide>
      <Simple />
      <GruntGulpEra />
      <Slide>
        <Headline>
          <i>~ Vibes ~</i>
        </Headline>
        <Image src={futurama} />
      </Slide>
      <OldBuilding />
    </SlideControl>
  );
}

function Simple() {
  return (
    <Slide>
      <SubHeadline>It used to be so simple</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/tools-simple.json")}
        path={require.resolve("../graphics/tools-simple.json")}
        edit
      />
    </Slide>
  );
}

function GruntGulpEra() {
  return (
    <Slide>
      <SubHeadline>Enter frontend frameworks</SubHeadline>
      <SlideControl>
        <>
          <Text>Grunt</Text>
          <Editor value={exampleGulpfile} />
        </>
        <>
          <Text>Gulp</Text>
          <Editor value={exampleGulpfile} />
        </>
      </SlideControl>
    </Slide>
  );
}

function OldBuilding() {
  return (
    <Slide>
      <SubHeadline>Let's unwrap</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/tools-old.json")}
        path={require.resolve("../graphics/tools-old.json")}
        edit
      />
    </Slide>
  );
}
