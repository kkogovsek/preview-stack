import React from "react";
import tw from "tw";
import "./base.css";

export default function Slide() {
  return (
    <Test>
      Hello zagreb &nbsp;
      <Blip />
    </Test>
  );
}

const Test = tw.div`bg-gray-800 text-white flex items-center justify-center p-2 text-xl border-pink-100 border-dotted gap-8 hover:bg-yellow-300 hover:text-black transition-all ease-in-out duration-300`;

const Blip = tw.div`
  inline-block h-8 w-8 rounded-full bg-green-600 animate-ping
`;
