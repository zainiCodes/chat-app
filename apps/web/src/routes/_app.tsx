import { Outlet, createRootRouteWithContext, useNavigate } from "@tanstack/react-router";

import { AppSidebar } from "@chat-app/ui/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@chat-app/ui/components/sidebar/sidebar"
import { Link, useLocation } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { SiteHeader } from "@/features/sidebarHeader/sideHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    const navigate = useNavigate()
    const queryClient = new QueryClient()
    return (
        <SidebarProvider>
            <div className="flex h-svh w-full">
                <AppSidebar renderLink={(url) => <Link to={url} />}
                    user={auth.data?.user} pathname={location.pathname} signOut={() => { authClient.signOut() }}
                    onLogoutRedirect={() => {
                        navigate({
                            to: "/login",
                        })
                    }} />
                <SidebarInset>
                    <SiteHeader />
                    <QueryClientProvider client={queryClient}>
                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            <Outlet />
                        </div>
                    </QueryClientProvider>

                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}