import { Separator } from "@chat-app/ui/components/separator"
import { SidebarTrigger } from "@chat-app/ui/components/sidebar/sidebar"
import { useLocation } from "@tanstack/react-router"

export function SiteHeader() {
    const { pathname } = useLocation()
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-xl font-medium text-[#2629e0]">{pathname === "/" ? "Chats" : pathname[1].toUpperCase() + pathname.slice(2)}</h1>

            </div>
        </header>
    )
}
