import useGetMessagebyId, { Message } from '@/hooks/getMessagesbyid'
import { authClient } from '@/lib/auth-client'
import { socket } from '@/lib/socket-client'
import { cn } from '@chat-app/ui/lib/utils'
import { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { useInView } from "react-intersection-observer"

export default function ChatBody({ conversationId }: { conversationId: string }) {
    const loggedInUser = authClient.useSession()
    const loggedInUserId = loggedInUser.data?.user.id
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useGetMessagebyId(conversationId)
    const queryClient = useQueryClient()

    // --- Scroll container via callback ref so useInView gets the real element, not null ---
    const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null)
    const scrollContainerRef = useCallback((node: HTMLDivElement | null) => {
        setScrollEl(node)
    }, [])

    // --- Top sentinel: when it comes into view, load older messages ---
    const { ref: topSentinelRef, inView } = useInView({
        root: scrollEl,      // observe inside our scroll div, not the window
        threshold: 0,
    })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    // --- Socket: incoming messages from other users ---
    useEffect(() => {
        if (!conversationId) return

        const handleMessage = (message: Message) => {
            if (message.conversationId !== conversationId) return
            if (message.senderId === loggedInUserId) return

            queryClient.setQueryData(
                ["Messages", conversationId],
                (old: any) => {
                    if (!old) return old

                    const exists = old.pages.some((page: any) =>
                        page.messages.some((m: Message) => m.id === message.id)
                    )
                    if (exists) return old

                    // Append to the LAST page (most recent) — index 0 in desc-fetched order
                    return {
                        ...old,
                        pages: old.pages.map((page: any, index: number) => {
                            if (index !== 0) return page
                            return { ...page, messages: [...page.messages, message] }
                        }),
                    }
                }
            )
        }

        socket.on("new-message", handleMessage)
        return () => { socket.off("new-message", handleMessage) }
    }, [loggedInUser, conversationId, queryClient, loggedInUserId])

    // --- Join / leave socket room ---
    useEffect(() => {
        if (!conversationId) return
        socket.emit("join-conversation", conversationId)
        return () => { socket.emit("leave-conversation", conversationId) }
    }, [conversationId])

    // --- Auto-scroll to bottom only when first page gains new messages (new sends/receives) ---
    const bottomRef = useRef<HTMLDivElement>(null)
    const firstPageLen = data?.pages[0]?.messages?.length ?? 0
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstPageLen])

    // --- Flatten pages into a chronological message list ---
    // React Query appends newer pages at pages[0] (desc fetch), older pages at higher indices.
    // Reversing pages gives us: oldest page first → newest page last → correct chat order.
    const messages = data?.pages
        .slice()
        .reverse()
        .flatMap((page) => page.messages)

    // --- Loading state ---
    if (isPending) {
        return (
            <div className="flex h-full w-full justify-center items-center text-muted-foreground">
                Loading messages...
            </div>
        )
    }

    // --- Empty state ---
    if (!messages || messages.length === 0) {
        return (
            <div className="flex h-full w-full justify-center items-center text-muted-foreground">
                No messages yet. Say hello! 👋
            </div>
        )
    }

    return (
        <div
            ref={scrollContainerRef}
            className="w-full h-[calc(90vh-10rem)] overflow-y-auto"
        >
            <div className="p-4 flex flex-col gap-2">

                {/* Top sentinel — triggers fetchNextPage when scrolled to top */}
                <div ref={topSentinelRef} />

                {/* Older messages loading indicator */}
                {isFetchingNextPage && (
                    <div className="flex justify-center py-2 text-sm text-muted-foreground">
                        Loading older messages...
                    </div>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex",
                            msg.senderId === loggedInUserId ? "justify-end" : "justify-start"
                        )}
                    >
                        <p className={cn(
                            msg.senderId === loggedInUserId
                                ? "bg-primary text-accent"
                                : "bg-gray-200",
                            "w-fit px-3 rounded-[16px] text-xl py-1"
                        )}>
                            {msg.content}
                        </p>
                    </div>
                ))}

                {/* Bottom anchor for auto-scroll */}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}
