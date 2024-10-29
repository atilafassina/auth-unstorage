/// <reference types="@solidjs/start/env" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    SESSION_SECRET: string;
  }
}
