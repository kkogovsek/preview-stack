import React from "react";
import tw from "tw";

export default function Slide() {
  return <Test>Hello 👋</Test>;
}

const Test = tw.div`bg-red-500 text-white flex items-center justify-center p-2 text-xl border-pink-100 border-dotted`;
