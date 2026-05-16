import {
    Sidebar,
    SidebarContent,
    SidebarFooter,

    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./sidebar"
import { Bell, MessageSquare, Settings, Users2 } from "lucide-react"
import Header, { type SidebarUser } from "./sidebar-header"
import { Separator } from "../separator"

import { cn } from "@chat-app/ui/lib/utils"
import { Logout } from "./logout-dialog"
const navItems = [
    {
        id: 1,
        title: "Chat",
        icon: MessageSquare,
        url: "/"
    },
    {
        id: 2,
        title: "Friends",
        icon: Users2,
        url: "/friends"
    },
    {
        id: 3,
        title: "Notification",
        url: "/notification",
        icon: Bell
    },
    {
        id: 4,
        title: "Settings",
        icon: Settings,
        url: "/settings"
    }
]


type AppSidebarProps = {
    renderLink?: (url: string) => React.ReactElement
    user?: SidebarUser | null
    pathname: string | null
    signOut: () => void
    onLogoutRedirect?: () => void
}

export function AppSidebar({ renderLink, user, pathname, signOut, onLogoutRedirect }: AppSidebarProps) {
    const handleLogout = () => {
        signOut()
        onLogoutRedirect?.()
    }
    return (
        <Sidebar>
            <SidebarHeader >
                <Header user={user} />
            </SidebarHeader>
            <Separator className="h-[2px] mx-3 mb-4" />
            <SidebarContent>
                <SidebarMenu >
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.id} className={cn("mb-3", item.url === pathname ? "border-l-4 border-primary " : "")}>
                            <SidebarMenuButton isActive={item.url === pathname} render={renderLink?.(item.url)} tooltip={item.title}>
                                {item.icon && <item.icon className={item.url === pathname ? "text-[#2629e0]" : ""} />}
                                <span className={cn("text-lg", item.url === pathname ? "text-[#2629e0]" : "")}>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <Logout logout={handleLogout} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}