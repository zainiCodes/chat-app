import { useQuery } from "@tanstack/react-query";
import { User } from "./useUser"
type Response = {
    message: string
    user: User
    friendships: {
        id: string;
        requesterId: string;
        receiverId: string;
        status: string;
    };
}

function useUserById(id: string) {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["UserById", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/getUserById/${id}`, {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch user")
            }

            const data: Response = await res.json()

            return data
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!id,

    }

    )
    return { data, isPending, error }
}
export default useUserById
