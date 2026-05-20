import { UserPlus } from "lucide-react"
import {
    Card,
    CardContent,
} from "@chat-app/ui/components/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@chat-app/ui/components/avatar"
import { Button } from "@chat-app/ui/components/button"

export default function FriendRequests() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="rounded-xl shadow-sm border border-slate-200">
                    <CardContent className="flex items-center justify-between p-4 h-full">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="https://i.pravatar.cc/150?u=julian" alt="Julian Vance" />
                                <AvatarFallback>JV</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-sm text-slate-900">Julian Vance</span>
                                <span className="text-xs text-muted-foreground">@Julian Vance</span>
                                <span className="text-xs text-slate-500 mt-0.5">2 hours ago</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 h-8 font-medium">Accept</Button>
                            <Button size="sm" variant="secondary" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-md px-4 h-8 border-transparent font-medium">Decline</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm border border-slate-200">
                    <CardContent className="flex items-center justify-between p-4 h-full">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="https://i.pravatar.cc/150?u=elena" alt="Elena Sterling" />
                                <AvatarFallback>ES</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm text-slate-900">Elena Sterling</span>
                                <span className="text-xs text-slate-500 mt-0.5">5 hours ago</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 h-8 font-medium">Accept</Button>
                            <Button size="sm" variant="secondary" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-md px-4 h-8 border-transparent font-medium">Decline</Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
