import { useQuery } from "@tanstack/react-query";
import type { Prisma } from "@chat-app/db";

export type ChatListItem = {
    id: string,
    userId: string,
    conversationId: string,
    role: "MEMBER" | "ADMIN",
    joinedAt: Date,
    conversation: {
        id: string,
        name: string | null,
        avatarUrl: string | null,
        type: "DIRECT" | "GROUP",
        createdAt: Date,
        updatedAt: Date,
        messages: {
            id: string,
            content: string | null,
            createdAt: Date,
            type: "TEXT"
        }[],
        participants: {
            id: string;
            conversationId: string;
            userId: string;
            role: "ADMIN" | "MEMBER";
            joinedAt: Date;
            leftAt: Date | null;
            mutedUntil: Date | null;
            lastReadSeq: bigint | null;
            user: {
                id: string;
                name: string;
                image: string | null;
                username: string;
                isOnline: boolean;
            }
        }[]
    }
}

type Response = {
    message: string;
    AllConversations: ChatListItem[];
};

// ...rest of your hook

function useChatList() {
    const { data, isPending, error } = useQuery<Response>({
        queryKey: ["ChatList"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/chat-list", {
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch Chats")
            }

            const data: Response = await res.json()

            return data
        },
        // staleTime: 1000 * 60 * 5,
    }

    )
    return { data, isPending, error }
}
export default useChatList
