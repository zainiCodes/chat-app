import { useQuery } from "@tanstack/react-query";
type Response = {
    message: string
    user: {
        id: string,
        name: string,
        email: string,
        username: string,
        image: string,
        bio: string,
        createdAt: Date,
    }
    friendships: {
        id: string;
        requesterId: string;
        receiverId: string;
        status: string;
    }[];
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
    }

    )
    return { data, isPending, error }
}
export default useUserById
