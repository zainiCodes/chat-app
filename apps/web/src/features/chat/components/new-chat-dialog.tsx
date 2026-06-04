import useFriendList from '@/hooks/useFriendsList'
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader
} from "@chat-app/ui/components/dialog"
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@chat-app/ui/components/avatar"
import {
    ScrollArea
} from "@chat-app/ui/components/scroll-area"
import { Input } from '@chat-app/ui/components/input'
import { Button } from '@chat-app/ui/components/button'
import { Send } from "lucide-react"
import { QueryClient, useMutation } from '@tanstack/react-query'
import { ChatListItem } from '@/hooks/getChatList'

export default function NewChatDialog({ children, setId }: { children: React.ReactNode, setId: (id: string) => void }) {
    const { data, isPending } = useFriendList()
    const qc = new QueryClient()

    const mutation = useMutation({
        mutationFn: async (id) => {
            await fetch("http://localhost:3000/api/new-conversation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ id }),
            })
        },
        onMutate: async (id: string) => {
            await qc.cancelQueries({ queryKey: ["ChatList"] })
            const prevCon = qc.getQueryData(["ChatList"])
            qc.setQueryData(["ChatList"], (prev: any) => {
                if (!prev) return prev;
                const friend = data?.friends.find((f) => f.id === id);
                if (!friend) return prev;

                const newConversation: ChatListItem = {
                    id: "temp-" + Date.now(),
                    userId: "temp",
                    conversationId: "temp-conv-" + Date.now(),
                    role: "MEMBER",
                    joinedAt: new Date(),
                    conversation: {
                        id: "temp-conv-" + Date.now(),
                        avatarUrl: null,
                        name: null,
                        type: "DIRECT",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        messages: [],
                        participants: [
                            {
                                id: "temp-part",
                                role: "MEMBER",
                                lastReadSeq: null,
                                leftAt: null,
                                mutedUntil: null,
                                userId: friend.id,
                                conversationId: "temp-conv-" + Date.now(),
                                joinedAt: new Date(),
                                user: {
                                    id: friend.id,
                                    name: friend.name || "",
                                    username: friend.username || "",
                                    image: friend.image || null,
                                    isOnline: friend.isOnline || false,
                                }
                            }
                        ]
                    }
                }
                return {
                    ...prev,
                    AllConversations: [newConversation, ...(prev.AllConversations || [])]
                }
            })
            return { prevCon }
        },
        onError: (err, newTodo, context) => {
            qc.setQueryData(["ChatList"], context?.prevCon)
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["ChatList"] })
        }



    })


    const handleStartChat = (friendId: string) => {
        setId(friendId)
        mutation.mutate(friendId)
        console.log("Start conversation with", friendId)
    }

    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Conversation</DialogTitle>
                </DialogHeader>
                <div className='flex gap-2'>
                    <Input placeholder='Search' />
                    <Button>Search</Button>
                </div>
                <ScrollArea className="h-[300px] w-full mt-2 pr-4">
                    {isPending ? (
                        <div className="flex justify-center p-4 text-sm text-muted-foreground">Loading friends...</div>
                    ) : !data?.friends || data.friends.length === 0 ? (
                        <div className="text-center p-6 text-sm text-muted-foreground">
                            You don't have any friends yet to start a conversation with.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {data.friends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className="flex items-center gap-3 p-2 hover:bg-muted transition-colors"
                                >
                                    <Avatar className="h-10 w-10 border shrink-0">
                                        <AvatarImage src={friend.image || undefined} />
                                        <AvatarFallback>
                                            {(friend.name || friend.username || "U").charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                        {friend.isOnline && <AvatarBadge className="bg-green-500" />}
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm truncate">
                                            {friend.name || friend.username || "User"}
                                        </h4>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {friend.username ? `@${friend.username}` : ''}
                                        </p>
                                    </div>
                                    <DialogClose>
                                        <Send className='text-primary hover:bg-muted transition-colors cursor-pointer' onClick={() => {
                                            handleStartChat(friend.id)
                                        }} />
                                    </DialogClose>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
