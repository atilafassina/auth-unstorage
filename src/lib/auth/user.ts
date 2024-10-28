import { action, cache, redirect, revalidate } from "@solidjs/router";
import { getSessionUser, terminateSession } from "./session";
import { getUserByEmail } from "../db/helpers";

export const getLoggedUser = cache(async () => {
  "use server";
  const session = await getSessionUser();
  const user = await getUserByEmail(session?.email ?? "");

  if (user) {
    return {
      email: user.email,
    };
  } else {
    console.log("redirecting");
    throw redirect("/");
  }
}, "logged-user");

export const logout = action(async () => {
  "use server";

  await terminateSession();

  return revalidate("logged-user");
});
