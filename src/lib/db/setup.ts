import crypto from "crypto";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

export interface Password {
  hash: string;
  salt: string;
}

export interface User {
  email: string;
  password: Password;
}

export const storage = createStorage({
  driver: fsLiteDriver({
    base: "./data",
  }),
});

const salt = crypto.randomBytes(16).toString("hex");

storage.setItem("user:data", [
  {
    email: "steve@mine.craft",
    password: {
      hash: crypto
        .pbkdf2Sync("123123", salt, 1000, 64, "sha256")
        .toString("hex"),
      salt,
    },
  },
]);
