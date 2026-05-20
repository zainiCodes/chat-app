import { useQuery } from "@tanstack/react-query";
type Response = {
    message: string,
    friendRequests: {
        requester: {
            id: string;
            name: string;
            image: string;
            username: string;
        }
        id: string;
        createdAt: Date;
        updatedAt: Date;
        requesterId: string;
        receiverId: string;
    }[]
}

function useAllRequests() {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["AllRequests"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/allRequests", {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch request")
            }

            const data: Response = await res.json()

            return data
        },
        staleTime: 1000 * 60 * 5,
    }

    )
    return { data, isPending, error }
}
export default useAllRequests
