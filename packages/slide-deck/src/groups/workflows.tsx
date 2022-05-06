import React from "react";
import tw from "tw";
import { Headline, List, Slide, SubHeadline, Image } from "../components";
import { Excalidraw } from "../utils/excalidraw";
import { SlideControl } from "../utils/slide-control";

export function Workflows() {
  return (
    <SlideControl>
      <Slide>
        <Headline>Workflows</Headline>
      </Slide>
      <Goal />
      <BasicGitWorkflow />
      <BasicGitWorkflowStages />
      <GitWithTeams />
    </SlideControl>
  );
}

function Goal() {
  return (
    <Slide>
      <SubHeadline>Goal</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/basic-workflow.json")}
        path={require.resolve("../graphics/basic-workflow.json")}
        // edit
      />
    </Slide>
  );
}

function BasicGitWorkflow() {
  return (
    <Slide>
      <SubHeadline>Git workflow</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/workflow-git.json")}
        path={require.resolve("../graphics/workflow-git.json")}
        edit
      />
    </Slide>
  );
}

function BasicGitWorkflowStages() {
  return (
    <Slide>
      <SubHeadline>Git workflow - with stages</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/workflow-git-stages.json")}
        path={require.resolve("../graphics/workflow-git-stages.json")}
        edit
      />
    </Slide>
  );
}

function GitWithTeams() {
  return (
    <Slide>
      <SubHeadline>Git workflow - with team</SubHeadline>
      <Excalidraw
        key="org"
        content={require("../graphics/workflow-git-team.json")}
        path={require.resolve("../graphics/workflow-git-team.json")}
        edit
      />
    </Slide>
  );
}
