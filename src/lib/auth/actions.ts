import { action, redirect, revalidate } from "@solidjs/router";
import { getSessionUser, setSession } from "./session";
import { login, register } from "../db/helpers";
import ERRORS from "../errors";
import { getLoggedUser } from "./user";

export const authUser = action(async (formData: FormData) => {
  "use server";

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const formType = String(formData.get("type"));

  if (!email || !password || !formType) {
    return ERRORS.BAD_FORM_ENTRY;
  }

  try {
    const user = await (formType === "login"
      ? login(email, password)
      : register(email, password));

    if (typeof user === "string") {
      throw new Error(user);
    } else {
      await setSession(user.email);
    }
  } catch (e) {
    throw e;
  }
  throw redirect("/protected", {
    revalidate: [getSessionUser.key, getLoggedUser.key],
  });
});
