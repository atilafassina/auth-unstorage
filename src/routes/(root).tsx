import { A, createAsync, type RouteDefinition } from "@solidjs/router";
import { type ParentProps } from "solid-js";
import { Navigation } from "../components/ui/navigation";
import { LoginLogout } from "../components/ui/login-logout";
import { getLoggedUser } from "~/lib/auth/user";

export const route: RouteDefinition = {
  preload() {
    return getLoggedUser();
  },
};

export default function Layout(props: ParentProps) {
  const user = createAsync(() => getLoggedUser());

  return (
    <main class="min-h-screen bg-neutral-200 text-neutral-700">
      <header class="sticky top-0 z-50 flex items-center justify-between bg-slate-700 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none backdrop-blur text-slate-200">
        <div class="grid grid-cols-3 py-2 px-8 items-center w-full max-w-8xl mx-auto ">
          <div class="flex justify-start gap-2">
            <div class="flex justify-start gap-2">
              <A href="/" aria-label="Home page">
                <span>Home</span>
              </A>
            </div>
          </div>
          <Navigation />
          <div class="lg:order-2 self-center flex basis-0 gap-4 items-center justify-end">
            <div class="bg-black/20 p-2">
              <LoginLogout user={user} />
            </div>
          </div>
        </div>
      </header>
      {props.children}
    </main>
  );
}
