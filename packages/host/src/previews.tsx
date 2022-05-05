import React from "react";
import { RemoteComponent } from "./loader";

type PullRequest = {
  number: number;
  author?: {
    avatarUrl: string;
    login: string;
  };
};

export function Previews() {
  const [pullRequests, setPullRequests] = React.useState<PullRequest[]>([]);
  React.useEffect(() => {
    fetch(
      "https://ktbundglul5nizfvttcgpiiz6i0tbcsw.lambda-url.eu-central-1.on.aws/"
    )
      .then((res) => res.json())
      .then((requests) => setPullRequests(requests));
  }, []);

  return pullRequests.map((pull, index) => (
    <RemoteComponent
      key={`${pull.number}-${index}`}
      system={{
        module: "./entry",
        scope: `federated_preview_slide_pr_${pull.number}`,
        url: `https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/${pull.number}/preview-slide/container.js`,
      }}
    />
  ));
}
