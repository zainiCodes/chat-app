import useChatList from '@/hooks/getChatList'
import { Button } from '@chat-app/ui/components/button'
import { MessageCirclePlusIcon } from "lucide-react"
import { useLoaderData } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@chat-app/ui/components/avatar"
import NewChatDialog from './new-chat-dialog'
import { Spinner } from '@chat-app/ui/components/spinner'

export default function ChatList({ setId }: { setId: (id: string) => void }) {
    const { data, isPending } = useChatList()
    const auth = useLoaderData({ from: "/_app/" })

    if (isPending) {
        return <div className="p-4 text-sm text-muted-foreground text-center">
            <div className='w-full h-full flex items-center justify-center'>
                <Spinner className='size-7' />
            </div>
        </div>
    }

    if (!data?.AllConversations || data.AllConversations.length === 0) {
        return (
            <div className='flex flex-col gap-4 items-center justify-center h-full text-center'>
                <div className="bg-primary/10 p-4 rounded-full">
                    <MessageCirclePlusIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-foreground">No conversations yet</h3>
                    <p className='text-muted-foreground text-sm mt-1 max-w-[200px]'>
                        Start connecting with your friends to see your chats here.
                    </p>
                </div>
                <NewChatDialog setId={setId}>
                    <Button className="rounded-lg mt-2">
                        <MessageCirclePlusIcon className="w-4 h-4 mr-2" />
                        New Conversation
                    </Button>
                </NewChatDialog>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 overflow-y-auto h-full pr-2 mt-4 pb-20">
            {data.AllConversations.map((item) => {
                const isGroup = item.conversation.type === "GROUP";
                // Get other participants
                const otherParticipants = item.conversation.participants.filter(p => p.userId !== auth.session.user.id);

                // For direct chats, there should be 1 other participant
                const mainParticipant = otherParticipants[0];

                let displayName = "Unknown";
                let displayAvatar: string | null = null;
                let isOnline = false;

                if (isGroup) {
                    displayName = item.conversation.name || "Group Chat";
                    displayAvatar = item.conversation.avatarUrl;
                } else if (mainParticipant) {
                    displayName = mainParticipant.user.name || mainParticipant.user.username || "User";
                    displayAvatar = mainParticipant.user.image;
                    isOnline = mainParticipant.user.isOnline;
                }

                const lastMessage = item.conversation.messages[0];

                return (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 py-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setId(item.id)}
                    >
                        <Avatar className="h-12 w-12 border shrink-0">
                            <AvatarImage src={displayAvatar || undefined} />
                            <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
                            {isOnline && <AvatarBadge className="bg-green-500" />}
                        </Avatar>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium text-sm truncate">{displayName}</h4>
                                {lastMessage && (
                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2 shrink-0">
                                        {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                                {lastMessage ? (
                                    lastMessage.type === 'TEXT' ? lastMessage.content : `[${lastMessage.content}]`
                                ) : (
                                    "No messages yet"
                                )}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
