import { cache, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";

export interface SessionData {
  email: string | undefined | null;
}

export function getSession() {
  "use server";

  return useSession<SessionData>({
    password: process.env.SESSION_SECRET,
  });
}

export const protect = cache(async () => {
  "use server";

  const user = await getSessionUser();
  if (!user) {
    throw redirect("/");
  }

  return null;
}, "protect");

export async function getSessionUser(): Promise<SessionData | null> {
  "use server";
  const { data: sessionData } = await getSession();

  return Boolean(sessionData.email) ? sessionData : null;
}

export async function setSession(email: string) {
  "use server";
  const session = await getSession();

  await session.update((user: SessionData) => ((user.email = email), user));
}

export async function terminateSession() {
  "use server";
  const session = await getSession();

  await session.update((user: SessionData) => (user.email = undefined));
}
