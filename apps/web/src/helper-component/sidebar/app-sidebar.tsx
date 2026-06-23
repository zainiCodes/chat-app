import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./sidebar"
import { Bell, MessageSquare, Settings, Users2 } from "lucide-react"
import Header, { type SidebarUser } from "./sidebar-header"
import { Separator } from "@chat-app/ui/components/separator"
import { cn } from "@chat-app/ui/lib/utils"
import { Logout } from "./logout-dialog"
import { authClient } from "@/lib/auth-client"
import { Navigate, useNavigate } from "@tanstack/react-router"
import { useLocation } from "@tanstack/react-router"
const navItems = [
    {
        id: 1,
        title: "Chat",
        icon: MessageSquare,
        url: "/"
    },
    {
        id: 2,
        title: "Make Friends",
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
}

export function AppSidebar({ renderLink }: AppSidebarProps) {
    const navigate = useNavigate()
    const loggedInUser = authClient.useSession()
    const user = loggedInUser.data?.user
    const { pathname } = useLocation()
    const handleLogout = async () => {
        await authClient.signOut()
        navigate({
            to: "/login",
        })
    }
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader >
                <div className="flex items-center mt-2 group-data-[collapsible=icon]:justify-center">
                    {/* <SidebarTrigger /> */}
                </div>
                <Header user={user} />
            </SidebarHeader>
            <Separator className="h-[2px] mx-3 mb-4 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:w-4" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.id} className="my-1">
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
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}