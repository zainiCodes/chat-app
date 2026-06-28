import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Prisma } from "@chat-app/db";

export type Message = {
    type: "TEXT" | "IMAGE" | "VOICE";
    id: string;
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
    seq: number;
    senderId: string;
    content: string | null;
    mediaUrl: string | null;
    mimeType: string | null;
    replyToId: string | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    editedAt: Date | null;
    sender: {
        id: string,
        name: string,
        image: string | null
    }
}

type Response = {
    message: string;
    allMessages: Message[];
};

// ...rest of your hook

function useGetMessagebyId(conversationId: string) {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["Messages", conversationId],
        enabled: !!conversationId,
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/get-messages/${conversationId}`, {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch Chats")
            }

            const data: Response = await res.json()

            return data
        },
        staleTime: 1000 * 60 * 5,
    }
    )
    return { data, isPending, error }
}
export default useGetMessagebyId
