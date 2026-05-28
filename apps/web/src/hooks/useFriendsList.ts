import { useQuery } from "@tanstack/react-query";

type Response = {
    message: string
    friends: {
        friendshipId: string;
        id: string;
        name: string | null;
        username: string | null;
        image: string | null;
        isOnline: boolean;
    }[];
}
function useFriendList() {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["friendList"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/getFriendsList", {
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
export default useFriendList
