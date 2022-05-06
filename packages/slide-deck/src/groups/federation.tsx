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

export function Federation() {
  return (
    <SlideControl>
      <Slide>
        <Headline>Federation</Headline>
      </Slide>
      <Slide>
        <SubHeadline>
          " An organization or group within which smaller divisions have some
          degree of internal autonomy.
        </SubHeadline>
      </Slide>
      <Slide>
        <SubHeadline>
          " Early 18th century: from French fédération, from late Latin
          foederatio(n-), from the verb foederare ‚<strong>"to ally"</strong>
          ‚from foedus ‚<strong>"league"</strong>
        </SubHeadline>
        <Text>
          <strong>league</strong> ~ a collection of people, or groups that
          combine for mutual protection or cooperation.
        </Text>
      </Slide>
      <Slide>
        <Image src={structures} />
      </Slide>
      <Slide>
        <SubHeadline>How does all that relate to webpack?</SubHeadline>
      </Slide>
      <Slide>
        <SlideControl reveal>
          <SubHeadline>ModuleFederationPlugin</SubHeadline>
          <Editor value={federationPluginExample} />
        </SlideControl>
      </Slide>
      <Slide>
        <SlideControl>
          <SubHeadline>How do we load this?</SubHeadline>
          <SubHeadline>Three simple steps</SubHeadline>
        </SlideControl>
      </Slide>
    </SlideControl>
  );
}

function Configuration() {}
