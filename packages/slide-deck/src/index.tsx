import React from "react";
import tw from "tw";
import { Headline, List, ListO, Slide, SubHeadline } from "./components";
import { Processes } from "./groups/processes";
import { Tools } from "./groups/tools";
import { WebpackSlides } from "./groups/webpack";
import { Workflows } from "./groups/workflows";
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
        <li>
          Klemen - <code>@kkogovsek</code> 👋
        </li>
        <li>Ljubljana office 🐉🏰</li>
        <li>Inventing and solving problems ⚙️</li>
      </List>
    </Slide>
  );
}

function Agenda() {
  return (
    <Slide>
      <SubHeadline>Agenda</SubHeadline>
      <ListO>
        <li>Processes</li>
        <li>Workflows</li>
        <li>Tools</li>
        <li>Webpack</li>
        <li>Microfrontends</li>
        <li>Module Federation</li>
        <li>Previews?</li>
      </ListO>
      {/* <Excalidraw
        key="org"
        content={require("./graphics/traditional-org.json")}
        path={require.resolve("./graphics/traditional-org.json")}
        edit
      /> */}
    </Slide>
  );
}

function Agile() {
  return (
    <Slide>
      <SubHeadline>Let's talk agile</SubHeadline>
      <List>
        <SlideControl reveal>
          <></>
          <li>
            <strong>Individuals and interactions</strong> over processes and
            tools
          </li>
          <li>
            <strong>Working software</strong> over comprehensive documentation
          </li>
          <li>
            <strong>Customer collaboration</strong> over contract negotiation
          </li>
          <li>
            <strong>Responding to change</strong> over following a plan
          </li>
          <li>
            <i>
              while there is value in the items on the right, we value the items
              on the left more
            </i>
          </li>
        </SlideControl>
      </List>
    </Slide>
  );
}

export default function SlideDeck() {
  return (
    <SlidesRoot>
      <First />
      <Introduction />
      <Agenda />
      <Agile />
      <Processes />
      <Workflows />
      <Tools />
      <WebpackSlides />
    </SlidesRoot>
  );
}
