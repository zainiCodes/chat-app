import loginPage from '@/features/auth/components/sign-in-form';
import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/login')({
  component: loginPage,
  beforeLoad: (async ({ context }) => {
    const session = await context.authClient.getSession()
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

