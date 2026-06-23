import { Outlet, useNavigate } from "@tanstack/react-router";

import { AppSidebar } from "@/helper-component/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, } from "@/helper-component/sidebar/sidebar"
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/helper-component/sidebarHeader/sideHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app')({
    component: AppLayout,
    head: () => ({
        meta: [
            {
                title: "Chat-App",
            },
            {
                name: "description",
                content: "chat-app is a web application",
            },
        ],
        links: [
            {
                rel: "icon",
                href: "/favicon.ico",
            },
        ],
    }),
});

function AppLayout() {

    return (
        <SidebarProvider>
            <div className="flex h-svh w-full">
                <AppSidebar renderLink={(url) => <Link to={url} />} />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                        <Outlet />
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}