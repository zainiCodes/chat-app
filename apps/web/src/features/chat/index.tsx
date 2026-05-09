import { Route } from "@/routes/index"
export function ChatComponet() {
    const auth = Route.useRouteContext()
    return <div>Hello {auth.session.user.username}</div>
}