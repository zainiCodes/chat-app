import { useQuery } from "@tanstack/react-query";
type Response = {
    message: string,
    friendRequestNotification: {
        type: "NotificationType";
        id: string;
        createdAt: Date;
        body: string;
        receiverId: string;
        title: string;
        isRead: boolean;
        friendshipId: string;
        messageId: string | null;
        senderId: string | null;
        sender: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image: string;
            username: string;
            bio: string | null;
            isOnline: boolean;
        }
    }[]
}

function useFriendRequestNotification() {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["FriendRequestNoti"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/getFriendRequestNotification", {
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
export default useFriendRequestNotification
