import React from "react";
import tw from "tw";

export default function Slide() {
  return (
    <Test>
      Live&nbsp;
      <Blip />
    </Test>
  );
}

const Test = tw.div`bg-gray-800 text-white flex items-center justify-center p-2 text-xl border-pink-100 border-dotted gap-8`;

const Blip = tw.div`
  inline-block h-8 w-8 rounded-full bg-green-600 animate-ping
`;
