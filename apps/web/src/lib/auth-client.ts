import { env } from "@chat-app/env/web";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@chat-app/auth"
export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});
