import React from "react";
import tw from "tw";
import { Headline, List, Slide, SubHeadline, Image } from "../components";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";
import moveFast from "./assets/move_fast.jpeg";
import michael from "./assets/ceo.gif";
import overlay from "./assets/empower-overlay.png";

export function Processes() {
  return (
    <>
      <SlideControl>
        <Intro />
        <MoveFast />
        <ButWhy />
        <Intro />
        <CreativeProcess />
        <Slide>
          <Headline>L A G O M</Headline>
        </Slide>
        <Empower />
      </SlideControl>
    </>
  );
}

function Intro() {
  return (
    <Slide center>
      <Headline>Processes</Headline>
    </Slide>
  );
}

function ButWhy() {
  return (
    <Slide>
      <SubHeadline>But why 🤔</SubHeadline>
      <List>
        <SlideControl reveal>
          <></>
          <li>add to confidence and consistency</li>
          <li>make outcomes more predictable</li>
          <li>help deliver as per requirements</li>
          <li>enable planning</li>
        </SlideControl>
      </List>
    </Slide>
  );
}

function MoveFast() {
  return (
    <Slide>
      <SlideControl>
        <div>
          <Image src={moveFast} />
        </div>
        <SubHeadline>
          You should be able to move fast without breaking things
        </SubHeadline>
      </SlideControl>
    </Slide>
  );
}

function CreativeProcess() {
  return (
    <Slide>
      <SubHeadline>Creative process</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/creative-process.json")}
        path={require.resolve("../graphics/creative-process.json")}
        // edit
      />
    </Slide>
  );
}

function Empower() {
  return (
    <Slide>
      <Image src={michael} overlay={overlay} />
    </Slide>
  );
}

/*
- 
- 
- help deliver as per requirements
- 
*/
