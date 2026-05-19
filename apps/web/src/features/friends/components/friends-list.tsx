import {
    Card,
    CardContent,
} from "@chat-app/ui/components/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@chat-app/ui/components/avatar"
import {
    Button
} from "@chat-app/ui/components/button"
import {
    UserPlus2
} from "lucide-react"
export default function FriendsList() {
    return (
        <div className="w-full flex flex-col gap-4 mt-6">
            <h2 className="text-lg font-semibold text-foreground">Discovery</h2>
            <Card className="w-full rounded-2xl border border-border shadow-sm">
                <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border">
                            <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-medium text-foreground">Sarah Jenkins</span>
                            <span className="text-xs text-muted-foreground">@sarah_codes</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="secondary" className="flex-1 bg-[#eef2fc] hover:bg-[#e0e8f9] text-[#1e293b] font-medium h-10 rounded-lg">
                            View Profile
                        </Button>
                        <Button className="h-10 w-10 bg-[#4B53BC] hover:bg-[#3f46a3] shrink-0 p-0 rounded-lg">
                            <UserPlus2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
