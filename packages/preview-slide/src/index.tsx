import React from "react";
import tw from "tw";

export default function Slide() {
  const [state, setState] = React.useState(0)
  return <Test>We did it <button onClick={() => setState(state + 1)}>{state}</button></Test>;
}

const Test = tw.div`bg-gray-800 text-white flex items-center justify-center p-2 text-xl border-pink-100 border-dotted`;
