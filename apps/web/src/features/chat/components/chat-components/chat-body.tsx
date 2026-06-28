import useGetMessagebyId, { Message } from '@/hooks/getMessagesbyid'
import { authClient } from '@/lib/auth-client'
import { socket } from '@/lib/socket-client'
import { ScrollArea } from '@chat-app/ui/components/scroll-area'
import { cn } from '@chat-app/ui/lib/utils'
import { useEffect, useRef } from "react"
import { useQueryClient } from '@tanstack/react-query'


export default function ChatBody({ conversationId }: { conversationId: string }) {
    const loggedInUser = authClient.useSession()
    const loggedInUserId = loggedInUser.data?.user.id
    const { data, isPending } = useGetMessagebyId(conversationId)
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!conversationId) return

        const handleMessage = (message: Message) => {
            // Ignore messages for other conversations
            if (message.conversationId !== conversationId) {
                return
            }

            if (message.senderId === loggedInUserId) {
                return
            }

            queryClient.setQueryData(
                ["Messages", conversationId],
                (old: any) => {
                    if (!old) return old

                    // Prevent duplicates
                    const exists = old.allMessages.some(
                        (m: Message) => m.id === message.id
                    )

                    if (exists) return old

                    return {
                        ...old,
                        allMessages: [
                            ...old.allMessages,
                            message,
                        ],
                    }
                }
            )
        }

        socket.on("new-message", handleMessage)

        return () => {
            socket.off("new-message", handleMessage)
        }
    }, [conversationId, queryClient, loggedInUser])

    useEffect(() => {
        if (!conversationId) return

        socket.emit("join-conversation", conversationId)

        return () => {
            socket.emit("leave-conversation", conversationId)
        }
    }, [conversationId])

    //for scrolling
    const bottomRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [data?.allMessages.length])
    ///

    if (!data?.allMessages || data.allMessages.length === 0) {
        return (
            <div className='flex h-full w-full justify-center items-center'>
                No messages to show yet!
            </div>
        )
    }
    return (
        <ScrollArea className="w-full h-[calc(90vh-10rem)]">
            <div className="p-4 flex flex-col gap-2">
                {data.allMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            msg.senderId === loggedInUserId
                                ? "self-end"
                                : "self-start"
                        )}
                    >
                        <p className={cn(
                            msg.senderId === loggedInUserId
                                ? "bg-primary text-accent"
                                : "bg-gray-200",
                            "w-fit px-3 rounded-[16px] text-xl py-1"
                        )}
                        >
                            {msg.content}
                        </p>
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    )
}
