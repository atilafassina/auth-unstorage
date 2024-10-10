import { Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { getLoggedUser } from "~/lib/auth/user";

export const route = {
  preload() {
    return getLoggedUser();
  },
};

export default function Protected() {
  const user = createAsync(() => getLoggedUser());

  return (
    <main>
      <Title>Protected</Title>
      <h1>Protected</h1>
      <p>
        This route has protected data, if you try to acces it while logged out,
        you'll be redirected
      </p>
      <Show when={user()?.email} fallback="not logged in">
        {(email) => (
          <div>
            <h2>User</h2>
            <p>{email()}</p>
          </div>
        )}
      </Show>
    </main>
  );
}
