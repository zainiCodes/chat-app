import { Toaster } from "@chat-app/ui/components/sonner";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppSidebar } from "@chat-app/ui/components/sidebar/app-sidebar"
import { SidebarProvider } from "@chat-app/ui/components/sidebar/sidebar"
import "../index.css";

export interface RouterAppContext { }

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "chat-app",
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

function RootComponent() {
  return (
    <>
      <HeadContent />
      {/* <SidebarProvider> */}
      <script
        async
        crossOrigin="anonymous"
        src="https://tweakcn.com/live-preview.min.js"
      />

      {/* <AppSidebar /> */}
      <div className="grid grid-rows-[auto_1fr] h-svh">

        <Outlet />
      </div>
      <Toaster richColors />
      {/* </SidebarProvider> */}
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
