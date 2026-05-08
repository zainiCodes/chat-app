import loginPage from '@/features/auth/components/sign-in-form';
import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/login')({
  component: loginPage,
  beforeLoad: (async () => {
    const session = await authClient.getSession()
    if (session.data) {
      throw redirect({
        to: "/",
      });
    }
    return {
      session: session.data,
    }
  })
})

