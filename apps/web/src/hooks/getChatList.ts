import { useQuery } from "@tanstack/react-query";
import type { Prisma } from "@chat-app/db";

type ChatListItem = Prisma.ConversationParticipantGetPayload<{
    include: {
        conversation: {
            include: {
                messages: true; // Note: You don't need 'take: 1' or 'orderBy' here, just 'true' works for types
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true;
                                username: true;
                                name: true;
                                image: true;
                                isOnline: true;
                            };
                        };
                    };
                };
            };
        };
    };
}>;

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
