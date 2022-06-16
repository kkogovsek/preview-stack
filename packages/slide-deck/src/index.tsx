import React from "react";
import tw from "tw";
import { Headline, List, ListO, Slide, SubHeadline } from "./components";
import { Demo } from "./groups/demo";
import { Federation } from "./groups/federation";
import { Microfrontends } from "./groups/microfrontents";
import { Processes } from "./groups/processes";
import { Tools } from "./groups/tools";
import { WebpackSlides } from "./groups/webpack";
import { Workflows } from "./groups/workflows";
import { Excalidraw } from "./utils/excalidraw";
import { SlideControl, SlidesRoot } from "./utils/slide-control";
import { Wallpaper } from "./utils/wallpaper";
import avatar from "./groups/assets/avatar.jpeg";
import { EditingProvider } from "./utils/editing";

function First() {
  return (
    <Slide center>
      <Headline>Preview it in production</Headline>
    </Slide>
  );
}

function Introduction() {
  return (
    <Slide bg="purple">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          gap: "32px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <SubHeadline>
            <code># whoami</code>
          </SubHeadline>
          <List>
            <li>
              Klemen - <code>@kkogovsek</code> 👋
            </li>
            <li>
              Always bet on{" "}
              <span
                style={{
                  background: "#f7e017",
                  color: "black",
                  fontWeight: "bold",
                  padding: "16px 2px 2px 16px",
                }}
              >
                JS
              </span>
            </li>
            <li>Passionate about DX</li>
          </List>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "2px solid white",
            }}
          >
            <img src={avatar} />
          </div>
          <div />
        </div>
      </div>
    </Slide>
  );
}

function Agenda() {
  return (
    <Slide bg="green">
      <SubHeadline color="">Agenda</SubHeadline>
      <ListO>
        <li>Processes</li>
        <li>Workflows</li>
        <li>Tools</li>
        <li>Webpack</li>
        <li>Module Federation</li>
        <li>D E M O 🤞</li>
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
    <Slide bg="red">
      <SubHeadline>Let's talk AGILE</SubHeadline>
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

function SlideDeck() {
  return (
    <EditingProvider editing={true}>
      <SlidesRoot>
        <First />
        <Introduction />
        <Agenda />
        <Agile />
        <Processes />
        <Workflows />
        <Tools />
        <WebpackSlides />
        <Federation />
        <Demo />
      </SlidesRoot>
    </EditingProvider>
  );
}

export default function WallpaperWrapper() {
  return (
    <>
      <Wallpaper />
      <SlideDeck />
    </>
  );
}
