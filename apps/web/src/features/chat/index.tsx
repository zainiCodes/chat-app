// side bar things are in @chat-app/ui/component/sidebar
import { Route } from "@/routes/_app/index"
export function ChatComponet() {
    const auth = Route.useRouteContext()
    return <div>Hello {auth.session.user.username}</div>
}