import { ChatComponet } from '@/features/chat';
import { authClient } from '@/lib/auth-client'
import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/chat')({
  component: ChatComponet,
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (!session.data) {
      throw redirect({
        to: "/",
      });
    }

    return {
      session: session.data,
    };
  },

})

