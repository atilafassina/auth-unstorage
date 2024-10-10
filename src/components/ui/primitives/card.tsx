import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { mergeClasses } from "../utils";

const Card: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={mergeClasses(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        local.class
      )}
      {...others}
    />
  );
};

const CardHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={mergeClasses("flex flex-col space-y-1.5 p-6", local.class)}
      {...others}
    />
  );
};

const CardTitle: Component<ComponentProps<"h3">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <h3
      class={mergeClasses(
        "text-lg font-semibold leading-none tracking-tight",
        local.class
      )}
      {...others}
    />
  );
};

const CardDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p
      class={mergeClasses("text-sm text-muted-foreground", local.class)}
      {...others}
    />
  );
};

const CardContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={mergeClasses("p-6 pt-0", local.class)} {...others} />;
};

const CardFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={mergeClasses("flex items-center p-6 pt-0", local.class)}
      {...others}
    />
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
