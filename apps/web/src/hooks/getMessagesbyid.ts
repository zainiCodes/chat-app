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
    messages: Message[];
    nextCursor: string | null;
    hasMore: boolean;
};



function useGetMessagebyId(conversationId: string) {
    const { data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        error, } = useInfiniteQuery<Response>({
            queryKey: ["Messages", conversationId],
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
            initialPageParam: undefined,
            queryFn: ({ pageParam }) => fetchNewMessages(conversationId, pageParam as string | undefined),
            enabled: !!conversationId,
            staleTime: 1000 * 60 * 5,
        }
        )
    return { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage }
}

async function fetchNewMessages(conversationId: string, pageParam?: string) {
    const url = new URL(
        `http://localhost:3000/api/get-messages/${conversationId}`
    );

    if (pageParam) {
        url.searchParams.set("cursor", pageParam);
    }
    const res = await fetch(url.toString(), {
        credentials: "include"
    })
    if (!res.ok) {
        throw new Error("Failed to fetch Chats")
    }

    const data: Response = await res.json()

    return data
}
export default useGetMessagebyId
