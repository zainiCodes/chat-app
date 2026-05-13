import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@chat-app/ui/components/card"
import { Skeleton } from "@chat-app/ui/components/skeleton"
import { Settings } from "lucide-react"


export default function SettingsSkeleton() {
    return (
        <div>
            {/* Top Profile Card */}
            <div className="grid grid-cols-1 gap-4 px-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            <div className="p-5 flex items-center gap-10">
                                {/* Avatar */}
                                <Skeleton className="h-25 w-25 rounded-full" />

                                {/* User Info */}
                                <div className="flex flex-col gap-3 w-full">
                                    <Skeleton className="h-8 w-52 rounded-md" />
                                    <Skeleton className="h-5 w-72 rounded-md" />
                                    <Skeleton className="h-5 w-full rounded-md" />
                                    <Skeleton className="h-5 w-3/4 rounded-md" />
                                </div>
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-4 px-4">
                {/* Profile Details Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-40 rounded-md" />
                            <Skeleton className="h-8 w-24 rounded-md" />
                        </div>

                        <Skeleton className="h-4 w-60 mt-2 rounded-md" />
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="space-y-2">
                                <Skeleton className="h-4 w-28 rounded-md" />
                                <Skeleton className="h-5 w-full rounded-md" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Preferences Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-40 rounded-md" />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-5 w-32 rounded-md" />
                                </div>

                                <Skeleton className="h-6 w-12 rounded-full" />
                            </div>
                        ))}

                        <div className="pt-2 border-t space-y-3">
                            <Skeleton className="h-4 w-32 rounded-md" />

                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-32 rounded-md" />
                                <Skeleton className="h-4 w-20 rounded-md" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

