import { Toaster } from "@chat-app/ui/components/sonner";
import { HeadContent, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
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
      <script
        async
        crossOrigin="anonymous"
        src="https://tweakcn.com/live-preview.min.js"
      />

      <div className="grid grid-rows-[auto_1fr] h-svh">

        <Outlet />
      </div>
      <Toaster richColors />

      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
