import SignUpPage from '@/features/auth/components/sign-up-form'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/signUp')({
    component: SignUpPage,
    beforeLoad: (async () => {
        const session = await authClient.getSession()
        if (session.data) {
            throw redirect({
                to: "/"
            })
        }
        return session
    })
})
