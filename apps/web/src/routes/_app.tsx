import { Outlet, createRootRouteWithContext, useNavigate } from "@tanstack/react-router";

import { AppSidebar } from "@chat-app/ui/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@chat-app/ui/components/sidebar/sidebar"
import { Link, useLocation } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { SiteHeader } from "@/helper-component/sidebarHeader/sideHeader";
import useUser from "@/hooks/useUser";
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
    const { data: userData } = useUser()
    const user = userData?.user || auth.data?.user
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <SidebarProvider>
            <div className="flex h-svh w-full">
                <AppSidebar renderLink={(url) => <Link to={url} />}
                    user={user} pathname={location.pathname} signOut={() => { authClient.signOut() }}
                    onLogoutRedirect={() => {
                        navigate({
                            to: "/login",
                        })
                    }} />
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