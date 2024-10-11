import crypto from "node:crypto";
import { storage, User } from "./setup";
import { z } from "zod";
import ERRORS from "../errors";

export function validateEmail(email: string) {
  if (z.string().email().safeParse(email).error) {
    return ERRORS.INVALID_EMAIL.message;
  } else {
    return true;
  }
}

export function validatePassword(password: string) {
  if (!password) {
    return ERRORS.PASSWORD_EMPTY.message;
  } else if (password.length < 6) {
    return ERRORS.PASSWORD_TOO_SHORT;
  }
}

export async function getUserByEmail(email: string) {
  "use server";
  const users: User[] | null = await storage.getItem("user:data");

  if (Array.isArray(users)) {
    const user = users.find((user) => user.email === email);
    return user;
  } else {
    return null;
  }
}

export async function hasAccount(email: string) {
  "use server";
  const user = await getUserByEmail(email);

  return Boolean(user);
}

export async function login(email: string, password: string) {
  "use server";
  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    console.warn("failing no user");
    return ERRORS.USER_NOT_FOUND.message;
  }

  const hash = crypto
    .pbkdf2Sync(password, user.password.salt, 1000, 64, "sha256")
    .toString("hex");

  if (hash !== user.password.hash) {
    console.warn("failing password", hash, user.password.hash);
    return ERRORS.PASSWORD_INVALID.message;
  }

  return user;
}

export async function register(email: string, password: string) {
  "use server";
  const userExists = await hasAccount(email);
  if (userExists) {
    return ERRORS.USER_EXISTS.message;
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256")
    .toString("hex");

  // remove `key` from object
  const [{ value: users }] = await storage.getItems(["user:data"]);

  const user = { email, password: { hash, salt } };

  await Promise.all([
    storage.setItem("user:data", [...(users as User[]), user]),
  ]);

  return user;
}
