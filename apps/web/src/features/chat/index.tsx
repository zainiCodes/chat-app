// side bar things are in @chat-app/ui/component/sidebar
import { Route } from "@/routes/_app/index"
import { useLoaderData } from "@tanstack/react-router"
export function ChatComponet() {
    const auth = useLoaderData({ from: "/_app/" })
    return <div>Hello {auth.session.user.username}</div>
}