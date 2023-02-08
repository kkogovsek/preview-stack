import React from "react";

interface Global {
  __webpack_init_sharing__: any;
  __webpack_share_scopes__: {
    default: any;
  };
  [key: `federated_${string}`]: {
    init: (arg0: any) => void;
    get: (arg0: any) => any;
  };
}

let initialized = false;
async function init() {
  if (!initialized) {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    initialized = __webpack_init_sharing__("default");
  }
  return initialized;
}

// const XKCD = lazy(() => import("comic/XKCD"));
function loadComponent(scope: `federated_${string}`, module) {
  return async () => {
    await init();
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

function loadRemoteModule({ url }: { url: string }) {
  return new Promise<() => void>((resolve, reject) => {
    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    const remove = () => {
      document.head.removeChild(element);
    };

    element.onload = () => {
      resolve(remove);
    };

    element.onerror = (error) => {
      document.head.removeChild(element);
      console.error(`Dynamic Script Error: ${url}`);
      reject(error);
    };

    document.head.appendChild(element);
  });
}

const useDynamicScript = ({ url }: { url: string }) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }
    let unmount;
    async function load() {
      try {
        unmount = await loadRemoteModule({ url });
        setReady(true);
      } catch (e) {
        setFailed(true);
      }
    }

    setReady(false);
    setFailed(false);
    load();

    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

type SystemConfig = {
  url: string;
  scope: `federated_${string}`;
  module: string;
};

export function RemoteComponent({ system }: { system: SystemConfig }) {
  const { ready, failed } = useDynamicScript({
    url: system && system.url,
  });

  const Component = React.useMemo(
    () =>
      system && !failed && ready
        ? React.lazy(loadComponent(system.scope, system.module))
        : null,
    [system.scope, system.module, failed, ready]
  );

  if (!system) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {system.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {system.url}</h2>;
  }

  if (!Component) {
    return <h2>Something strange is going on</h2>;
  }

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}
