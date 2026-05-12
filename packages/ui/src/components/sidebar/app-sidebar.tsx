import {
    Sidebar,
    SidebarContent,
    SidebarFooter,

    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./sidebar"
import { Bell, LogOut, MessageSquare, Settings } from "lucide-react"
import Header, { type SidebarUser } from "./sidebar-header"
import { Separator } from "../separator"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@chat-app/ui/components/dialog"
import { Button } from "../button"
const navItems = [
    {
        id: 1,
        title: "Chat",
        icon: MessageSquare,
        url: "/"
    },
    {
        id: 2,
        title: "Notification",
        url: "/notification",
        icon: Bell
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
                        <SidebarMenuItem key={item.id} className={item.url === pathname ? "border-l-4 border-primary" : ""}>
                            <SidebarMenuButton isActive={item.url === pathname} render={renderLink?.(item.url)} tooltip={item.title}>
                                {item.icon && <item.icon className={item.url === pathname ? "text-[#2629e0]" : ""} />}
                                <span className={item.url === pathname ? "text-[#2629e0]" : ""}>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <Dialog >
                            <DialogTrigger className="w-full">
                                <SidebarMenuButton
                                    className="text-red-500 hover:text-red-600"
                                    tooltip={"logout"}
                                >
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader className="flex flex-col items-center">
                                    <LogOut className="text-red-500 text-center w-full text-2xl my-3" />
                                    <DialogTitle className="text-center w-full mb-3">Logout</DialogTitle>

                                    <DialogDescription>

                                        Are you sure you want to logout?
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <DialogClose>
                                        <button className="border rounded-md px-4 py-2">
                                            Cancel
                                        </button>
                                    </DialogClose>

                                    <Button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                    >
                                        Logout
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}