import React from "react";
import tw from "tw";

export default function Slide() {
  return <Test>We did it in production! One more time!</Test>;
}

const Test = tw.div`bg-gray-800 text-white flex items-center justify-center p-2 text-xl border-pink-100 border-dotted`;
