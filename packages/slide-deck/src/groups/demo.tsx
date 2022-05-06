import React from "react";
import { Headline, List, Slide, SubHeadline, Image, Text } from "../components";
import { Editor } from "../utils/editor";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";
import {
  demo_0_init_sharing,
  demo_1_load_script,
  demo_2_get_module,
} from "./assets/code/demo";
import ending from "./assets/ending.gif";

export function Demo() {
  return (
    <SlideControl>
      <Slide>
        <SubHeadline>Initialize webpack sharing</SubHeadline>
        <Editor value={demo_0_init_sharing} />
      </Slide>
      <Slide>
        <SubHeadline>Load the script</SubHeadline>
        <Editor value={demo_1_load_script} />
      </Slide>
      <Slide>
        <SubHeadline>Load the module</SubHeadline>
        <Editor value={demo_2_get_module} />
      </Slide>
      <Slide>
        <Headline>DEMO</Headline>
      </Slide>
      <Slide>
        <Image src={ending} />
      </Slide>
      <Slide>
        <Headline>Thanks for joining</Headline>
      </Slide>
      <Slide>
        <Headline>Questions?</Headline>
      </Slide>
    </SlideControl>
  );
}
