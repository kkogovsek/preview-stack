import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { shadeColor } from "./colors";

const Animation = createGlobalStyle`
  @keyframes sliding {
    from {
      transform: rotate(45deg) translate3d(0vh, -180vh, 0);
    }
    to {
      transform: rotate(45deg) translate3d(0vh, 180vh, 0);
    }
  }
`;

const variations = {
  red: "#e95666",
  purple: "#6842ed",
  green: "#5dcbc6",
  yellow: "#f7d747",
};

let counter = 0;
let getRandomColorIndex = () => {
  counter = (counter + 1 + Math.round(Math.random() * 2)) % 4;
  return counter;
};
const generatePillRow = () =>
  new Array(6).fill(null).map((_, index) => ({
    x: index * 30 - 40,
    y: Math.round(Math.random() * 30) - 10,
    key: Math.random(),
    color: variations[Object.keys(variations)[getRandomColorIndex()]],
    velocity: 40 + Math.round(Math.random() * 300) / 100 - 0.5,
  }));

export function Wallpaper() {
  const [pills, setPills] = React.useState(window.pills ?? generatePillRow);
  window.pills = pills;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPills((current) => current.concat(generatePillRow()));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container viewport="0 0 50 50">
      <Animation />
      {pills.map((pill) => (
        <Pill
          onAnimationEnd={() =>
            setPills((current) => current.filter((p) => p !== pill))
          }
          key={pill.key}
          style={{
            animation: `sliding ${pill.velocity}s linear forwards`,
            background: pill.color,
            top: `${pill.y}%`,
            left: `${pill.x}%`,
            border: `10px solid ${shadeColor(pill.color, -5)}`,
          }}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  z-index: 10;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Pill = styled.div`
  position: absolute;
  width: 40vw;
  height: 70vw;
  border-radius: 30vw;
`;
