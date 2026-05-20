import { Card, CardContent } from "@chat-app/ui/components/card"
import { Skeleton } from "@chat-app/ui/components/skeleton"
import { ScrollArea } from "@chat-app/ui/components/scroll-area"

export default function FriendsProfileSkeleton() {
    return (
        <ScrollArea className="h-full w-full bg-slate-50">
            <div className="flex flex-col items-center min-h-full pb-8">
                {/* Top Blue Banner */}
                <Skeleton className="w-full h-40 bg-indigo-200/50 shrink-0 rounded-none" />

                {/* Profile Avatar Container */}
                <div className="relative -mt-16 flex flex-col items-center w-full">
                    <Skeleton className="w-[120px] h-[120px] rounded-full border-[5px] border-slate-50 shadow-sm" />

                    <div className="mt-4 flex flex-col items-center gap-2 w-full">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16 mt-1" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex w-full px-6 gap-3 mt-7">
                    <Skeleton className="flex-1 h-[72px] rounded-[14px]" />
                    <Skeleton className="flex-1 h-[72px] rounded-[14px]" />
                </div>

                {/* About Card */}
                <div className="w-full px-6 mt-6">
                    <Card className="rounded-[18px] border-0 shadow-sm overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <Skeleton className="h-3 w-16 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                                <Skeleton className="h-3 w-4/6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats Cards */}
                <div className="flex w-full px-6 gap-3 mt-4">
                    <Card className="flex-1 rounded-[18px] border-0 shadow-sm bg-white">
                        <CardContent className="p-4 flex items-center gap-3.5">
                            <Skeleton className="w-10 h-10 rounded-[12px] shrink-0" />
                            <div className="flex flex-col gap-1.5 w-full">
                                <Skeleton className="h-2.5 w-20" />
                                <Skeleton className="h-3.5 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1 rounded-[18px] border-0 shadow-sm bg-white">
                        <CardContent className="p-4 flex items-center gap-3.5">
                            <Skeleton className="w-10 h-10 rounded-[12px] shrink-0" />
                            <div className="flex flex-col gap-1.5 w-full">
                                <Skeleton className="h-2.5 w-20" />
                                <Skeleton className="h-3.5 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScrollArea>
    )
}