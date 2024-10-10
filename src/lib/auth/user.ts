import { action, cache, redirect } from "@solidjs/router";
import { getSessionUser, terminateSession } from "./session";
import { getUserByEmail } from "../db/helpers";

export const getLoggedUser = cache(async () => {
  "use server";
  const session = await getSessionUser();

  if (!session || !session.email) {
    throw redirect("/");
  }

  const user = await getUserByEmail(session.email);

  if (!user) {
    throw redirect("/");
  }

  return {
    email: user.email,
  };
}, "logged-user");

export const logout = action(async () => {
  "use server";
  await terminateSession();

  return redirect("/", { revalidate: "logged-user" });
});
