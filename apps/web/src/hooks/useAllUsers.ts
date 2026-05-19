import { useQuery } from "@tanstack/react-query";

type Response = {
    message: string
    users: {
        id: string,
        name: string,
        email: string,
        username: string,
        image: string,
    }[]
    friendships: {
        id: string;
        requesterId: string;
        receiverId: string;
        status: string;
    }[];
}
function useAllUsers() {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["friendList"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/getAllUsers", {
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
export default useAllUsers
