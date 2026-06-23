import { Button } from "@chat-app/ui/components/button"
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
} from "@chat-app/ui/components/avatar"
import { MessageSquarePlus } from "lucide-react"
import NewChatDialog from "@/features/chat/components/new-chat-dialog"
import { ChatContext } from "@/features/chat/chat-context"
import { useState } from "react"


export type SidebarUser = {
    username?: string | null,
    name?: string | null
    email?: string | null
    image?: string | null
    isOnline?: boolean
}
interface HeaderProps {
    user?: SidebarUser | null
}

export default function Header({ user }: HeaderProps) {
    const [sharedData, setSharedData] = useState({
        id: "",
        conversationId: "",
    })

    if (!user) {
        return (
            <div className="flex items-center justify-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 gap-1 group-data-[collapsible=icon]:hidden">
                    <div className="h-3 w-16 animate-pulse rounded bg-sidebar-accent" />
                    <div className="h-2 w-20 animate-pulse rounded bg-sidebar-accent" />
                </div>
                <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-sidebar-accent group-data-[collapsible=icon]:mx-auto" />
            </div>
        )
    }
    const firstLetter = user.name
        ? user.name.charAt(0).toUpperCase()
        : user.email
            ? user.email.charAt(0).toUpperCase()
            : 'U'

    return (
        <div className=''>
            <div className="flex justify-center items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-lg">{user.username ?? "User"}</span>
                    <span className="truncate font-medium text-xs">Online</span>
                </div>
                <Avatar className="h-10 w-10 shrink-0 group-data-[collapsible=icon]:mx-auto">
                    <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name ?? "User"}
                    />

                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
                        {firstLetter}
                    </AvatarFallback>
                    {
                        user.isOnline && (
                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        )
                    }

                </Avatar>
            </div>
            <div className="px-1 py-5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <NewChatDialog setSharedData={setSharedData}>
                    <Button className="w-full rounded-lg cursor-pointer group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0">
                        <span className="group-data-[collapsible=icon]:hidden"> New Chat</span>
                        <MessageSquarePlus className="hidden group-data-[collapsible=icon]:block h-5 w-5" />
                    </Button>
                </NewChatDialog>
            </div>
        </div >
    )
}