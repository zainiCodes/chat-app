import { useContext } from "react"
import { UserIdContext } from "../index"
import useUserById from "@/hooks/useUserById"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@chat-app/ui/components/avatar"
import {
    Button
} from "@chat-app/ui/components/button"
import { Card, CardContent } from "@chat-app/ui/components/card"
import { UserPlus, MessageSquare, Users, Calendar, Ban, Flag, UserSearch } from "lucide-react"
import { ScrollArea } from "@chat-app/ui/components/scroll-area"
import FriendsProfileSkeleton from "@/helper-component/skeletons/friends-profile-skeleton"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default function FriendsProfile() {
    const userId = useContext(UserIdContext)
    const { data, isPending } = useUserById(userId)
    const queryClient = useQueryClient()
    console.log(data)

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("http://localhost:3000/api/friendshipRequest", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ friendId: userId }),
            })
            const data = await res.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["UserById", userId] })
            toast.success("Request sent successfully!")
        }
    })

    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-gray-500 rounded-tr-[inherit] rounded-br-[inherit]">
                <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                    <UserSearch className="w-12 h-12 text-[#7371e7]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No user selected</h3>
                <p className="text-sm font-medium">Click on a user from the list to view their profile</p>
            </div>
        )
    }

    if (isPending) {
        return (
            <FriendsProfileSkeleton />
        )
    }

    if (!data) return null;

    const { user } = data;
    const friendshipStatus = data.friendships?.status;

    const memberSince = user.createdAt
        ? new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(user.createdAt))
        : 'Unknown';

    return (
        <ScrollArea className="h-full w-full bg-slate-50">
            <div className="flex flex-col items-center min-h-full pb-8">
                {/* Top Blue Banner */}
                <div className="w-full h-40 bg-[#7371e7] shrink-0" />

                {/* Profile Avatar Container */}
                <div className="relative -mt-16 flex flex-col items-center">
                    <Avatar className="w-[120px] h-[120px] border-[5px] border-slate-50 shadow-sm overflow-visible">
                        <AvatarImage className="rounded-full object-cover" src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                        <AvatarFallback className="rounded-full">{user.name?.charAt(0)}</AvatarFallback>
                        {/* <AvatarBadge className="bg-[#22c55e] w-6 h-6 border-[3px] border-slate-50 rounded-full absolute right-1 bottom-1" /> */}
                    </Avatar>

                    <div className="mt-4 flex flex-col items-center">
                        <div className="flex items-center gap-1.5">
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        </div>
                        <p className="text-[#7371e7] font-medium text-sm mt-0.5">@{user.username}</p>
                        <p className="text-gray-500 text-xs mt-1.5 font-medium">Active now</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex w-full px-6 gap-3 mt-7">
                    {friendshipStatus === "PENDING" ? (
                        <Button disabled={true} className="flex-1 bg-[#7371e7] hover:bg-[#605ecc] text-white rounded-[14px] py-[26px] shadow-sm font-medium">
                            Waiting for response
                        </Button>
                    ) : friendshipStatus === "ACCEPTED" ? (
                        <Button disabled={true} className="flex-1 bg-[#22c55e] hover:bg-[#1ea850] text-white rounded-[14px] py-[26px] shadow-sm font-medium">
                            <Users className="w-[18px] h-[18px] mr-2" /> Friends
                        </Button>
                    ) : (
                        <Button disabled={mutation.isPending} onClick={() => mutation.mutate()} className="flex-1 bg-[#7371e7] hover:bg-[#605ecc] text-white rounded-[14px] py-[26px] shadow-sm font-medium">
                            <UserPlus className="w-[18px] h-[18px] mr-2" />
                            {mutation.isPending ? "Requesting..." : "Send Friend Request"}
                        </Button>
                    )}
                    <Button variant="secondary" className="bg-[#e7eaf6] hover:bg-[#d8dcf0] text-[#1e293b] rounded-[14px] py-[26px] px-8 shadow-none border-0 font-medium">
                        <MessageSquare className="w-[18px] h-[18px] mr-2" />
                        Message
                    </Button>
                </div>

                {/* About Card */}
                <div className="w-full px-6 mt-6">
                    <Card className="rounded-[18px] border-0 shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">Bio</h3>
                            <p className="text-gray-600 leading-relaxed text-sm font-medium">
                                {user.bio}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats Cards */}
                <div className="flex w-full px-6 gap-3 mt-4">
                    <Card className="flex-1 rounded-[18px] border-0 shadow-sm bg-white">
                        <CardContent className="p-4 flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-[12px] bg-[#f0f4ff] flex items-center justify-center shrink-0">
                                <Users className="w-5 h-5 text-[#8690d5]" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">Total Friends</h3>
                                <p className="font-bold text-gray-900 text-[13px]">{data.friendships == null ? 0 : 1}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1 rounded-[18px] border-0 shadow-sm bg-white">
                        <CardContent className="p-4 flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-[12px] bg-[#f0f4ff] flex items-center justify-center shrink-0">
                                <Calendar className="w-5 h-5 text-[#8690d5]" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">Member Since</h3>
                                <p className="font-bold text-gray-900 text-[13px]">{memberSince}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Actions */}
                <div className="flex w-full px-16 justify-between mt-10">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-xs font-semibold">
                        <Ban className="w-4 h-4 text-[#d9945e]" />
                        Block User
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-xs font-semibold">
                        <Flag className="w-4 h-4 text-[#d9945e]" />
                        Report Profile
                    </button>
                </div>
            </div>
        </ScrollArea>
    )
}
