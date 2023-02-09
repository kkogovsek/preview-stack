import React from "react";
import { firstBy } from "thenby";

type Commmit = {
  message: string;
  sha: string;
  date: Date;
};

export function useCommits() {
  const [commits, setCommits] = React.useState<Commmit[]>([]);
  React.useEffect(() => {
    async function load() {
      const commits: string[] = await fetch(
        "https://cy4qyd5oruf5jm6gvdy3eqlu240pfnan.lambda-url.eu-central-1.on.aws/"
      ).then((res) => res.json());
      const githubInfo = await Promise.all(
        commits.map((hash) =>
          fetch(
            `https://api.github.com/repos/kkogovsek/preview-stack/git/commits/${hash}`
          ).then((res) => res.json())
        )
      );
      setCommits(
        githubInfo
          .map((el) => ({
            sha: el.sha,
            message: el.message,
            date: new Date(el.author.date),
          }))
          .sort(firstBy((el) => el.date, "desc"))
      );
    }
    load();
  }, []);
  return commits;
}
