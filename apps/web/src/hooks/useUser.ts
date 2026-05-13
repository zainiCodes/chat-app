import { useQuery } from "@tanstack/react-query"

export type User = {
    id: string
    name: string
    email: string
    username: string
    image?: string | null
    bio?: string | null
    isOnline: boolean
    lastSeenAt?: string | null
}

export type GetUserResponse = {
    message: string
    user: User
}

export default function useUser() {
    const { data, isPending, isLoading, error } = useQuery<GetUserResponse>({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/getUser", {
                credentials: "include",
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user")
            }

            const data: GetUserResponse = await res.json()

            return data
        },
        staleTime: 1000 * 60 * 5,
    })

    return { data, isPending, error, isLoading }
}