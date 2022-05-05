import React from "react";

const SlideControlContext = React.createContext();

function SlideControlProvider({
  count = 1,
  wentBack = false,
  initialState: [currentInitialValue, ...otherInitialValues] = [undefined],
  children,
}) {
  const prevController = React.useContext(SlideControlContext);
  const [slide, setSlide] = React.useState(() => {
    if (currentInitialValue !== undefined) return currentInitialValue;
    return wentBack ? count - 1 : 0;
  });
  const childRef = React.useRef();
  const wentBackRef = React.useRef(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!childRef.current) {
        history.replaceState(
          {
            slidesChain: prevController
              ? prevController.chain.concat(slide)
              : [slide],
          },
          ""
        );
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, [slide, prevController]);

  const controller = React.useMemo(
    () => ({
      next: () => {
        if (slide < count - 1) {
          wentBackRef.current = false;
          childRef.current = false;
          setSlide(slide + 1);
        } else if (prevController) {
          prevController.next();
        }
      },
      prev: () => {
        if (slide > 0) {
          childRef.current = false;
          wentBackRef.current = true;
          setSlide(slide - 1);
        } else if (prevController) {
          prevController.prev();
        }
      },
      registerChild: () => {
        childRef.current = true;
        return () => (childRef.current = false);
      },
      chain: prevController ? prevController.chain.concat(slide) : [slide],
      slide,
      wentBack: wentBackRef.current,
      initialPass: otherInitialValues,
    }),
    [count, slide, prevController]
  );

  React.useEffect(() => {
    if (prevController) {
      return prevController.registerChild();
    }
  }, []);

  React.useEffect(() => {
    const listener = (event) => {
      if (!childRef.current) {
        if (event.key === "ArrowRight") {
          controller.next();
        } else if (event.key === "ArrowLeft") {
          controller.prev();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <SlideControlContext.Provider value={controller}>
      {children}
    </SlideControlContext.Provider>
  );
}

export function SlidesRoot({ children }) {
  const [initialState, setInitialState] = React.useState(
    history.state?.slidesChain
  );
  React.useEffect(() => {
    const timeout = setTimeout(() => setInitialState(undefined), 5);
    return () => clearTimeout(timeout);
  }, []);

  return <SlideControl initialState={initialState}>{children}</SlideControl>;
}

export function SlideControl({ children, reveal, initialState }) {
  const count = React.Children.count(children);
  const wentBack = React.useContext(SlideControlContext)?.wentBack;
  const initialPass = React.useContext(SlideControlContext)?.initialPass;
  const chain = React.useContext(SlideControlContext)?.chain ?? [];

  return (
    <SlideControlProvider
      count={count}
      wentBack={wentBack}
      initialState={initialState || initialPass}
    >
      <SlideControlInner reveal={reveal}>{children}</SlideControlInner>
    </SlideControlProvider>
  );
}

export function SlideControlInner({ children, reveal = false }) {
  const { slide } = React.useContext(SlideControlContext);

  const shouldDisplay = (index) => {
    if (reveal) {
      return index <= slide;
    }
    return index === slide;
  };

  return (
    <>
      {React.Children.toArray(children).map((item, index) =>
        shouldDisplay(index) ? (
          <React.Fragment key={index}>{item}</React.Fragment>
        ) : null
      )}
    </>
  );
}
