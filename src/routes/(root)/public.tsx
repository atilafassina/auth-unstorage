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
      <div class="grid place-items-center pt-10">
        <h1 class="text-2xl text-neutral-500 font-bold pb-10">Public</h1>
        <p class="pb-5">this route is unprotected.</p>
        <p class="pb-10">But if you're logged in, it knows.</p>
        <Suspense fallback="checking...">
          <Show when={user()?.email} fallback="not logged in">
            {(email) => (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span class="font-bold">User</span>
                    </td>
                    <td>
                      <p>{email()}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </Show>
        </Suspense>
      </div>
    </main>
  );
}
