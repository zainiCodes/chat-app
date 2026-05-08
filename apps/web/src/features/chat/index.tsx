import { Route } from "@/routes/chat"
export function ChatComponet() {
    const auth = Route.useRouteContext()
    return <div>Hello {auth.session.user.name}</div>
}