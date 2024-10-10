import { Title } from "@solidjs/meta";
import { createAsync, RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { getSessionUser } from "~/lib/auth/session";

export const route: RouteDefinition = {
  async preload() {
    return getSessionUser();
  },
};

export default function About() {
  const user = createAsync(() => getSessionUser());

  return (
    <main>
      <Title>Public</Title>
      <h1>Public</h1>
      <p>
        this route is unprotected. But if you're logged-in, we know about it.
      </p>
      <Suspense fallback="checking...">
        <Show when={user()?.email} fallback="not logged in">
          {(email) => (
            <div>
              <h2>User</h2>
              <p>{email()}</p>
            </div>
          )}
        </Show>
      </Suspense>
    </main>
  );
}
