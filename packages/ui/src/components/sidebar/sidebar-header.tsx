import { Button } from "../button"
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
} from "@chat-app/ui/components/avatar"

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
    if (!user) {
        return (
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="h-8 w-8 animate-pulse rounded-full bg-sidebar-accent" />
                <div className="grid flex-1 gap-1">
                    <div className="h-3 w-16 animate-pulse rounded bg-sidebar-accent" />
                    <div className="h-2 w-20 animate-pulse rounded bg-sidebar-accent" />
                </div>
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
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-lg">{user.username ?? "User"}</span>
                    <span className="truncate font-medium text-xs">Online</span>
                </div>
                <Avatar className="h-10 w-10">
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
            <div className="px-1 py-5">
                <Button className="w-full rounded-lg cursor-pointer">+ New Chat</Button>
            </div>
        </div>
    )
}