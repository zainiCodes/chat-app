import { Outlet, createFileRoute, createRootRouteWithContext } from "@tanstack/react-router";

import { AppSidebar } from "@chat-app/ui/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@chat-app/ui/components/sidebar/sidebar"
import { Link, useLocation } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
export interface RouterAppContext { }

export const Route = createRootRouteWithContext<RouterAppContext>()({
    component: AppLayout,
    head: () => ({
        meta: [
            {
                title: "zaini",
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
    const auth = authClient.useSession()
    const location = useLocation()
    return (
        <SidebarProvider>
            <div className="flex h-svh">
                <AppSidebar renderLink={(url) => <Link to={url} />}
                    user={auth.data?.user} pathname={location.pathname} signOut={() => { authClient.signOut() }} />
                <SidebarTrigger />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}