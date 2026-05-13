import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@chat-app/ui/components/card"
import { Circle, User, Settings, Eye } from "lucide-react"
import useUser from '@/hooks/useUser';
import { Switch } from "@chat-app/ui/components/switch"
import EditProfileDialog from './edit-profile';
import { cn } from '@chat-app/ui/lib/utils';
import { Skeleton } from 'boneyard-js/react';
export default function UserProfile() {
    const { data, isLoading } = useUser()
    const userData = data?.user
    const firstLetter = userData?.name
        ? userData?.name.charAt(0).toUpperCase()
        : userData?.email
            ? userData?.email.charAt(0).toUpperCase()
            : 'U'
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 px-4 ">
                <Card className='@container/card'>
                    <CardHeader>
                        <CardDescription>
                            <Skeleton loading={isLoading}>
                                <div className='p-5 flex items-center gap-10'>
                                    <div className="flex h-25 w-25 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground overflow-hidden">
                                        {userData?.image ? (
                                            <img src={userData.image} alt={userData.name ?? "User"} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="font-semibold text-3xl">{firstLetter}</span>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='font-semibold  text-4xl'>{userData?.name}</h1>
                                        <p className='text-muted-foreground '>@{userData?.username ?? "User"} | {userData?.email}</p>
                                        <h3 className={cn(!userData?.bio ? "text-red-500" : "")}>{userData?.bio || "USER BIO IS NOT SET"} </h3>
                                    </div>
                                </div>
                            </Skeleton>
                        </CardDescription>

                    </CardHeader>
                </Card>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-4 px-4 ">
                <Card className="@container/card">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-2 font-semibold tabular-nums">
                            <div className="text-xl flex items-center gap-2">
                                <User className="text-primary" />
                                <h4 className="text-xl">Profile Details</h4>
                            </div>

                            <EditProfileDialog />
                        </CardTitle>

                        <CardDescription>
                            Manage your personal information
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid gap-5">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Full Name
                                </p>

                                <div >
                                    {userData?.name}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Email Address
                                </p>

                                <div>
                                    {userData?.email}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Username
                                </p>

                                <div>
                                    @{userData?.username}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    Bio
                                </p>

                                <div className={cn(!userData?.bio && "text-red-500")}>
                                    {userData?.bio || "USER BIO IS NOT SET"}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>

                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Settings className="text-primary w-5 h-5" />
                            <CardTitle>App Preferences</CardTitle>
                        </div>
                    </CardHeader>


                    <CardContent className="space-y-6">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Circle className="text-muted-foreground w-4 h-4" />
                                <span className="text-sm font-medium">Online Status</span>
                            </div>

                            <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Show "Last Seen"
                                </span>
                            </div>

                            <Switch />
                        </div>

                        {/* Recent Activity */}
                        <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-3">
                                Recent Activity
                            </p>

                            <div className="flex items-center justify-between text-sm">
                                <span>Last seen online</span>
                                <span className="text-muted-foreground">Just now</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        4.5%
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Steady performance increase <TrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Meets growth projections</div>
                </CardFooter>
            </Card> */}

        </div>

    )
}
