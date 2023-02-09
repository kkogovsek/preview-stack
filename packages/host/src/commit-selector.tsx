import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { createContext } from "react";
import { SystemConfig } from "./loader";
import { useCommits } from "./use-commits";

const local: SystemConfig = {
  module: "./entry",
  scope: "federated_slide_deck",
  url: "https://localhost:1338/container.js",
};

const SystemContext = createContext<
  [
    SystemConfig | undefined,
    React.Dispatch<React.SetStateAction<SystemConfig | undefined>>
  ]
>([local, () => undefined]);

export function SystemProvider({ children }: PropsWithChildren<{}>) {
  const state = useState<SystemConfig | undefined>(local);
  return (
    <SystemContext.Provider value={state}>{children}</SystemContext.Provider>
  );
}
export function useSystem() {
  return React.useContext(SystemContext);
}

export function CommitSelector() {
  const commits = useCommits();
  const [system, setSystem] = useSystem();
  const [menuOpen, setMenuOpen] = React.useState(false);

  if (!commits.length) return null;
  return (
    <div className="inline-block text-left fixed bottom-2 right-[20vw] z-40">
      <div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex w-full justify-center text-white hover:text-black rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Versions
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="absolute right-0 bottom-12 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              href="#"
              className={`text-gray-700 block px-4 py-2 text-sm hover:opacity-80 w-full text-left ${
                system?.url?.includes("localhost")
                  ? "text-gray-600 bg-gray-300"
                  : ""
              }`}
              role="menuitem"
              tabIndex={-1}
              id="menu-item-6"
              onClick={() => setSystem(local)}
            >
              Local
            </button>
          </div>
          {console.log(commits)}
          {commits.map((commit) => (
            <div className="py-1" role="none" key={commit.sha}>
              <button
                href="#"
                className={`text-gray-700 block px-4 py-2 text-sm hover:opacity-80 w-full text-left ${
                  system?.url?.includes(commit.sha)
                    ? "text-gray-600 bg-gray-100"
                    : ""
                }`}
                role="menuitem"
                tabIndex={-1}
                id="menu-item-6"
                onClick={() =>
                  setSystem({
                    module: "./entry",
                    scope: `federated_slide_deck_pr_${commit.sha}`,
                    url: `https://previews-talk-hosting.s3.eu-central-1.amazonaws.com/commits/${commit.sha}/slide-deck/container.js`,
                  })
                }
              >
                {commit.message}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
