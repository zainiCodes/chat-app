import {
    Sidebar,
    SidebarContent,
    SidebarFooter,

    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./sidebar"
import { MessageSquare, Settings, Users, LogOut } from "lucide-react"
import Header, { type SidebarUser } from "./sidebar-header"
import { Separator } from "../separator"
const navItems = [
    {
        id: 1,
        title: "Chat",
        icon: MessageSquare,
        url: "/"
    },
    {
        id: 2,
        title: "Contacts",
        url: "/contacts",
        icon: Users
    },
    {
        id: 3,
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
}

export function AppSidebar({ renderLink, user, pathname, signOut }: AppSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader >
                <Header user={user} />
            </SidebarHeader>
            <Separator className="h-[2px] mx-3 mb-4" />
            <SidebarContent>
                <SidebarMenu >
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.id} className={item.url === pathname ? "border-l-4 border-primary" : ""}>
                            <SidebarMenuButton isActive={item.url === pathname} render={renderLink?.(item.url)} tooltip={item.title}>
                                {item.icon && <item.icon className={item.url === pathname ? "text-[#2629e0]" : ""} />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-red-500 hover:text-red-600 " tooltip={"logout"} render={renderLink?.("/")} onClick={signOut}>
                            <LogOut />
                            <span>{"Logout"}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}