import { useQuery } from "@tanstack/react-query";

type Response = {
    message: string,
    AllConversations: {
        id: string;
        userId: string;
        conversationId: string;
        role: "ADMIN" | "MEMBER";
        joinedAt: Date;
        leftAt: Date | null;
        mutedUntil: Date | null;
        lastReadSeq: bigint | null;
        conversation: {
            id: string;
            type: "DIRECT" | "GROUP";
            name: string | null;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            messages: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                conversationId: string;
                type: "TEXT" | "IMAGE" | "VOICE"
                seq: bigint;
                senderId: string;
                content: string | null;
                mediaUrl: string | null;
                mimeType: string | null;
                replyToId: string | null;
                isDeleted: boolean;
                deletedAt: Date | null;
                editedAt: Date | null;
            }[];
            participants: {
                id: string;
                userId: string;
                conversationId: string;
                role: "ADMIN" | "MEMBER";
                joinedAt: Date;
                leftAt: Date | null;
                mutedUntil: Date | null;
                lastReadSeq: bigint | null;
                user: {
                    id: string;
                    username: string | null;
                    name: string | null;
                    image: string | null;
                    isOnline: boolean;
                }
            }[];
        }
    }[]
}

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
