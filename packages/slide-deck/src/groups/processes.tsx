import React from "react";
import { Headline, List, Slide, SubHeadline, Image, Bold } from "../components";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";
import moveFast from "./assets/move_fast.jpeg";
import michael from "./assets/ceo.gif";
import overlay from "./assets/empower-overlay.png";
import boring from "./assets/boring-boss-baby.gif";

export function Processes() {
  return (
    <>
      <SlideControl>
        <Intro />
        <MoveFast />
        <Intro />
        <Slide>
          <Image src={boring} />
        </Slide>
        <ButWhy />
        <CreativeProcess />
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
    <Slide bg="red">
      <SubHeadline>But why 🤔</SubHeadline>
      <List>
        <SlideControl reveal>
          <></>
          <li>
            add to <Bold>confidence</Bold> and <Bold>consistency</Bold>
          </li>
          <li>
            make outcomes more <Bold>predictable</Bold>
          </li>
          <li>
            help deliver as <Bold>per requirements</Bold>
          </li>
          <li>
            enable <Bold>planning</Bold>
          </li>
        </SlideControl>
      </List>
    </Slide>
  );
}

function MoveFast() {
  return (
    <SlideControl>
      <Slide>
        <Image src={moveFast} />
      </Slide>
      <Slide bg="purple">
        <SubHeadline>
          You should be able to move fast without breaking (
          <span style={{ fontStyle: "italic" }}>too many</span>) things
        </SubHeadline>
      </Slide>
    </SlideControl>
  );
}

function CreativeProcess() {
  return (
    <Slide>
      <SubHeadline bg="purple">Creative process</SubHeadline>
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
