import { RouterProvider, createRouter, redirect } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { Spinner } from "@chat-app/ui/components/spinner"
import { routeTree } from "./routeTree.gen";
import { authClient } from "./lib/auth-client";
import NotFoundPage from "./not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultPendingComponent: () => <Spinner />,
  defaultNotFoundComponent: () => <NotFoundPage />,
  context: {
    authClient,
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
