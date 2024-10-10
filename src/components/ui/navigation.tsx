import { A, type AnchorProps, useMatch } from "@solidjs/router";

function NavAnchor(props: AnchorProps) {
  const match = useMatch(() => props.href);
  return (
    <A classList={{ "opacity-45": Boolean(match()) }} href={props.href}>
      {props.children}
    </A>
  );
}

export function Navigation() {
  return (
    <nav class="flex justify-around">
      <NavAnchor href="/">Login</NavAnchor>
      <NavAnchor href="/public">public</NavAnchor>
      <NavAnchor href="/protected">protected</NavAnchor>
    </nav>
  );
}
