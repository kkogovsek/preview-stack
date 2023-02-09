import React from "react";
import { Headline, List, Slide, SubHeadline, Image, Text } from "../components";
import { Editor } from "../utils/editor";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";
import {
  federationPluginExample,
  loadRemoteModule,
} from "./assets/code/webpack-minimal";
import structures from "./assets/structure.png";
import palpatine from "./assets/palpatine.gif";

export function Federation() {
  return (
    <SlideControl>
      <Slide>
        <Headline>Federation</Headline>
      </Slide>
      <Slide>
        <Image src={palpatine} />
      </Slide>
      <Slide>
        <SubHeadline bg="red">
          " An organization or group within which smaller divisions have some
          degree of internal autonomy.
        </SubHeadline>
      </Slide>
      {/* <Slide>
        <SubHeadline bg="green">
          " Early 18th century: from French fédération, from late Latin
          foederatio(n-), from the verb foederare ‚<strong>"to ally"</strong>
          ‚from foedus ‚<strong>"league"</strong>
        </SubHeadline>
        <Text bg="purple">
          <strong>league</strong> ~ a collection of people, or groups that
          combine for mutual protection or cooperation.
        </Text>
      </Slide> */}
      <Slide>
        <Image src={structures} />
      </Slide>
      <Slide>
        <SubHeadline bg="green">How does that relate to webpack?</SubHeadline>
      </Slide>
      <Slide>
        <SlideControl reveal>
          <SubHeadline bg="red">
            ModuleFederationPlugin (from old commit)
          </SubHeadline>
          <Editor value={federationPluginExample} />
        </SlideControl>
      </Slide>
      <Slide>
        <SlideControl>
          <SubHeadline bg="green">How do we load this?</SubHeadline>
          <SubHeadline bg="purple">Three simple steps</SubHeadline>
        </SlideControl>
      </Slide>
    </SlideControl>
  );
}

function Configuration() {}
