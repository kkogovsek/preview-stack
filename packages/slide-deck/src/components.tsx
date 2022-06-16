import React from "react";
import tw from "tw";
import styled, { css } from "styled-components";

const variations = {
  red: "#e95666",
  purple: "#6842ed",
  green: "#5dcbc6",
  yellow: "#f7d747",
  black: "black",
};

const wrapBg = (component) => styled(component)`
  ${(props) =>
    props.bg &&
    css`
      background: ${variations[props.bg] ?? "transparent"};
    `}
`;

export const Slide = wrapBg(
  tw.div<{
    center?: boolean;
    bg?: "red" | "purple" | "green" | "yellow" | "black";
  }>`w-full h-full  text-white flex flex-col items-start ${(props) =>
    props.center
      ? "items-center"
      : ""} justify-center p-16 gap-12 relative z-20`
);
export const Headline = wrapBg(tw.h1`text-9xl text-center select-none`);
export const SubHeadline = wrapBg(tw.h1`text-7xl select-none`);
export const List = tw.ul`text-6xl flex flex-col gap-8 select-none`;
export const ListO = tw.ol`text-6xl flex flex-col gap-8 list-decimal pl-12 select-none`;
export const Text = wrapBg(tw.p`text-4xl select-none`);
export const Bold = tw.span`font-bold`;
export function Image({ src, overlay }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        userSelect: "none",
      }}
    >
      <ImageWrapper src={src} />
      {overlay && <ImageWrapper overlay src={overlay} />}
    </div>
  );
}
const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  max-height: 75vh;
  object-fit: contain;
  margin: auto;
  object-position: center;
  user-select: none;
  ${(p) => p.overlay && `position: absolute; top: 0; left: 0;`}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
