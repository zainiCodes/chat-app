import { authClient } from "@/lib/auth-client"

export default function getUser() {
    const session = authClient.useSession()
    return session.data?.user
}
