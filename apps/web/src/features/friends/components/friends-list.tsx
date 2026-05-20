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
import {
    ScrollArea
} from "@chat-app/ui/components/scroll-area"
import useAllUsers from "@/hooks/useAllUsers"
export default function FriendsList({ viewProfile }: { viewProfile: (id: string) => void }) {
    const { data } = useAllUsers()
    return (
        <div className="w-full flex flex-col gap-4 mt-6 overflow-hidden">
            <h2 className="text-lg font-semibold text-foreground">Discovery</h2>
            <ScrollArea className="w-full h-[calc(100vh-10rem)] ">
                {
                    data?.users.map((user) => {
                        return (
                            <Card key={user.id} className="w-full rounded-2xl border border-border my-5">
                                <CardContent className="p-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-20 w-20 border">
                                            <AvatarImage src={user.image} />
                                            <AvatarFallback className={"bg-primary text-white text-3xl"}>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col flex-1">
                                            <span className="text-lg font-semibold text-foreground">{user.name}</span>
                                            <span className="text-sm text-muted-foreground">@{user.username}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="secondary" onClick={() => { viewProfile(user.id) }} className="flex-1 bg-[#eef2fc] hover:bg-[#e0e8f9] rounded-sm text-[#1e293b] font-medium h-10">
                                            View Profile
                                        </Button>
                                        <Button className=" h-10 w-10 bg-[#4B53BC] hover:bg-[#3f46a3] shrink-0 p-0 rounded-lg">
                                            <UserPlus2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </ScrollArea>
        </div>
    )
}
