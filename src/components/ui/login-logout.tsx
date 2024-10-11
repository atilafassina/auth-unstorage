import { A, type AccessorWithLatest } from "@solidjs/router";
import { Show } from "solid-js";
import { SessionData } from "~/lib/auth/session";
import { logout } from "~/lib/auth/user";

interface Props {
  user?: AccessorWithLatest<SessionData | undefined | null>;
}

export function LoginLogout(props: Props) {
  return (
    <Show when={props?.user?.()?.email} fallback={<A href="/">Login</A>} keyed>
      <form action={logout} method="post">
        <button name="logout" type="submit">
          Logout
        </button>
      </form>
    </Show>
  );
}
