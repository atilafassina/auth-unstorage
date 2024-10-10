import { createMiddleware } from "@solidjs/start/middleware";
import { csrfProtection } from "./csrf-protection";

export default createMiddleware({
  onRequest: [csrfProtection],
});
