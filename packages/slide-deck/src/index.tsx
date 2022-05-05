import React from "react";
import tw from "tw";
import { Excalidraw } from "./utils/excalidraw";
import { SlideControl, SlidesRoot } from "./utils/slide-control";

function First() {
  return (
    <Slide center>
      <Headline>Preview it in production</Headline>
    </Slide>
  );
}

function Introduction() {
  return (
    <Slide>
      <SubHeadline>
        <code># whoami</code>
      </SubHeadline>
      <List>
        <SlideControl reveal>
          <li>
            Klemen - <code>@kkogovsek</code> 👋
          </li>
          <li>Ljubljana office 🐉🏰</li>
          <li>Problem solving ⚙️</li>
          <li>Procrastination</li>
        </SlideControl>
      </List>
    </Slide>
  );
}

function Agenda() {
  return (
    <Slide>
      <SubHeadline>Agenda</SubHeadline>
      <ListO>
        <SlideControl reveal>
          <li>Organizations</li>
          <li>Processes</li>
          <li>CI/CD</li>
          <li>Webpack</li>
          <li>Federation</li>
        </SlideControl>
      </ListO>
    </Slide>
  );
}

function Organizations() {
  return (
    <Slide>
      <SlideControl>
        <Headline>Organizations</Headline>
        <OldOrganizations />
      </SlideControl>
    </Slide>
  );
}

function OldOrganizations() {
  return (
    <SlideControl>
      <>
        <SubHeadline>Traditional organizations</SubHeadline>
        <Excalidraw
          key="org"
          content={require("./graphics/traditional-org.json")}
          path={require.resolve("./graphics/traditional-org.json")}
          edit
        />
      </>
      <>
        <SubHeadline>Collaboration</SubHeadline>
        <Excalidraw
          key="collab"
          content={require("./graphics/traditional-org-collaboration.json")}
          path={require.resolve(
            "./graphics/traditional-org-collaboration.json"
          )}
          edit
        />
      </>
      <>
        <SubHeadline>Communication paths</SubHeadline>
        <Excalidraw
          key="path"
          content={require("./graphics/traditional-org-collaboration-path.json")}
          path={require.resolve(
            "./graphics/traditional-org-collaboration-path.json"
          )}
          edit
        />
      </>
    </SlideControl>
  );
}

export default function SlideDeck() {
  return (
    <SlidesRoot>
      <First />
      <Introduction />
      <Agenda />
      <Organizations />
    </SlidesRoot>
  );
}

const Slide = tw.div<{
  center?: boolean;
}>`w-full h-full bg-black text-white flex flex-col items-start ${(props) =>
  props.center ? "items-center" : ""} justify-center p-64 gap-16`;
const Headline = tw.h1`text-9xl text-center`;
const SubHeadline = tw.h1`text-7xl`;
const List = tw.ul`text-6xl flex flex-col gap-6`;
const ListO = tw.ol`text-6xl flex flex-col gap-6 list-decimal`;
