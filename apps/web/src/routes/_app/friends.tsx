import FriendsComponent from '@/features/friends';
import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/friends')({

  component: FriendsComponent,
  loader: async ({ context }) => {
    const session = await context.authClient.getSession();

    if (!session.data) {
      return redirect({ to: '/login' })
    }
    return { session: session.data }
  },
})
