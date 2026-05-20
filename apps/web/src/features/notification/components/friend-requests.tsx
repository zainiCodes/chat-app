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

import { Skeleton } from "@chat-app/ui/components/skeleton"

import useAllRequests from "@/hooks/useAllRequests"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"

export default function FriendRequests() {
    const { data, isPending } = useAllRequests()

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({
            requestId,
            status,
        }: {
            requestId: string
            status: "ACCEPTED" | "REJECTED"
        }) => {
            const res = await fetch(
                "http://localhost:3000/api/acceptRejectRequest",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestId,
                        status,
                    }),
                }
            )

            if (!res.ok) {
                throw new Error("Something went wrong")
            }

            return res.json()
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["AllRequests"],
            })

            toast.success("Request updated successfully!")
        },

        onError: () => {
            toast.error("Failed to update request")
        },
    })

    if (isPending) {
        return (
            <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card
                            key={i}
                            className="rounded-xl shadow-sm border border-slate-200"
                        >
                            <CardContent className="flex items-center justify-between p-4 h-full">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-12 h-12 rounded-full" />

                                    <div className="flex flex-col gap-1.5">
                                        <Skeleton className="w-24 h-4 rounded-md" />
                                        <Skeleton className="w-16 h-3 rounded-md" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-[72px] h-8 rounded-md" />
                                    <Skeleton className="w-[72px] h-8 rounded-md" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (!data?.friendRequests?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p>No Notification to display</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.friendRequests.map((request) => {
                    return (
                        <Card
                            key={request.id}
                            className="rounded-xl shadow-sm border border-slate-200"
                        >
                            <CardContent className="flex items-center justify-between p-4 h-full">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage
                                            src={request.requester.image}
                                            alt={request.requester.name}
                                        />

                                        <AvatarFallback>
                                            {request.requester.name
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-semibold text-sm text-slate-900">
                                            {request.requester.name}
                                        </span>

                                        <span className="text-xs text-muted-foreground">
                                            @{request.requester.username}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 h-8 font-medium"
                                        disabled={mutation.isPending}
                                        onClick={() =>
                                            mutation.mutate({
                                                requestId: request.id,
                                                status: "ACCEPTED",
                                            })
                                        }
                                    >
                                        Accept
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-md px-4 h-8 border-transparent font-medium"
                                        disabled={mutation.isPending}
                                        onClick={() =>
                                            mutation.mutate({
                                                requestId: request.id,
                                                status: "REJECTED",
                                            })
                                        }
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}