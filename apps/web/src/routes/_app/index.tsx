import { createFileRoute, redirect } from "@tanstack/react-router";
import loginPage from "@/features/auth/components/sign-in-form";
import { ChatComponet } from "@/features/chat";
import { authClient } from "@/lib/auth-client";
export const Route = createFileRoute("/_app/")({
  component: ChatComponet,
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect({
        to: "/login",
      });
    }

    return {
      session: session.data,
    };
  },

});
