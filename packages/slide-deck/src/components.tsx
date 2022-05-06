import React from "react";
import tw from "tw";
import styled from "styled-components";

export const Slide = tw.div<{
  center?: boolean;
}>`w-full h-full bg-black text-white flex flex-col items-start ${(props) =>
  props.center ? "items-center" : ""} justify-center p-16 gap-12 `;
export const Headline = tw.h1`text-9xl text-center`;
export const SubHeadline = tw.h1`text-7xl`;
export const List = tw.ul`text-6xl flex flex-col gap-8`;
export const ListO = tw.ol`text-6xl flex flex-col gap-8 list-decimal pl-12`;
export const Text = tw.p`text-4xl`;
export function Image({ src, overlay }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ImageWrapper src={src} />
      {overlay && <ImageWrapper overlay src={overlay} />}
    </div>
  );
}
const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  ${(p) => p.overlay && `position: absolute; top: 0; left: 0;`}
`;
