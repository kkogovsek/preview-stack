import React, { Suspense } from "react";
import { RemoteComponent } from "./loader";
import PreviewSlide from "preview-slide";
import styled from "styled-components";
import { previewSlideSystem } from "./App";

type PullRequest = {
  number: number;
  author?: {
    avatarUrl: string;
    login: string;
  };
};

const commit = "c7401eedab92db9be0b3b2affbdf46694f2188d5";

export function Previews() {
  const [pullRequests, setPullRequests] = React.useState<PullRequest[]>([]);
  React.useEffect(() => {
    fetch(
      "https://ktbundglul5nizfvttcgpiiz6i0tbcsw.lambda-url.eu-central-1.on.aws/"
    )
      .then((res) => res.json())
      .then((requests) => setPullRequests(requests));
  }, []);

  React.useEffect(() => {
    const connection = new WebSocket(
      "wss://jon5wk72z9.execute-api.eu-central-1.amazonaws.com/production"
    );
    connection.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "build_complete") {
          setPullRequests((currentPulls) => {
            if (!currentPulls.find((pr) => pr.number === data.pr_id)) {
              return [{ number: data.pr_id }, ...currentPulls];
            } else {
              return currentPulls;
            }
          });
        }
      } catch (error) {}
    });
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <RemoteComponent system={previewSlideSystem} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <RemoteComponent
          system={{
            module: "./entry",
            scope: `federated_preview_slide_pr_${commit}`,
            url: `https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/commits/${commit}/preview-slide/container.js`,
          }}
        />
      </ErrorBoundary>

      {pullRequests.map((pull, index) => (
        <ErrorBoundary key={pull.number}>
          <RemoteComponent
            key={`${pull.number}-${index}`}
            system={{
              module: "./entry",
              scope: `federated_preview_slide_pr_${pull.number}`,
              url: `https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/previews/${pull.number}/preview-slide/container.js`,
            }}
          />
        </ErrorBoundary>
      ))}
    </>
  );
}

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 8px;
  bottom: 8px;
  border-radius: 50%;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ hasError: `Error: ${error.message || error}` });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1 style={{ color: "white" }}>{this.state.hasError}</h1>;
    }

    return this.props.children;
  }
}
