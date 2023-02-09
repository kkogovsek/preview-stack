import React, { forwardRef, PropsWithChildren } from "react";
import { Tag } from "./tags";

type InjectedValue<T> =
  | boolean
  | string
  | number
  | ((
      props: Omit<
        { children: React.Children; className: string } & T,
        "children" | "className"
      >
    ) => string);

// settings for being able to use refrences and classes on tailwind components
export const tw = new Proxy(
  {},
  {
    get<T>(_, el: Tag) {
      return (
        classStrings: TemplateStringsArray,
        ...attrs: Array<InjectedValue<T>>
      ) =>
        forwardRef(
          (
            {
              children,
              className,
              ...props
            }: PropsWithChildren<{ className: string }> & T,
            ref
          ) => {
            const classString = classStrings.reduce(
              (full, curr, index, all) => {
                full += curr;
                if (index < all.length - 1) {
                  const value = attrs[index];
                  if (typeof value === "function") {
                    full += value(props).toString();
                  } else {
                    full += value.toString();
                  }
                }
                return full;
              },
              ""
            );
            return React.createElement(
              el,
              { ...props, ref, className: `${classString} ${className ?? ""}` },
              children
            );
          }
        );
    },
  }
) as {
  [key in Tag]: <T>(
    strings: TemplateStringsArray,
    ...values: Array<InjectedValue<T>>
  ) => React.FC<PropsWithChildren<T>>;
};

export default tw;
