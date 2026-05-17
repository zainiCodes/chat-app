import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/friends')({

  component: RouteComponent,
  loader: async ({ context }) => {
    const session = await context.authClient.getSession();

    if (!session.data) {
      return redirect({ to: '/login' })
    }
    return { session: session.data }
  },
})

function RouteComponent() {
  return <div>Hello "/_app/friends"!</div>
}
