import { UserPlus } from "lucide-react"
import { Badge } from "@chat-app/ui/components/badge"
import FriendRequests from "./components/friend-requests"
export default function notificationsComponent() {
    return (
        <div className="w-full flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 text-indigo-700" strokeWidth={2} />
                <h2 className="text-lg font-bold text-slate-900">Friend Requests</h2>
            </div>
            <div>
                <FriendRequests />
            </div>
        </div>
    )
}
