import { Avatar, AvatarFallback, AvatarImage } from '@chat-app/ui/components/avatar'
import React from 'react'
import { User } from '@/hooks/useUser'

export default function ChatHeader({ data, isPending }: { data: User, isPending: boolean }) {
    return (<div className="border-b flex items-center p-4">
        {
            isPending ? (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                    <div className="flex flex-col">
                        <div className="h-4 w-20 bg-muted rounded mb-2 animate-pulse" />
                        <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                    </div>
                </div>
            ) : data.name ? (
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border shrink-0">
                        <AvatarImage src={data.image || undefined} />
                        <AvatarFallback>{data.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-semibold text-sm">{data.name}</h4>
                        <span className="text-[10px] text-muted-foreground">{data.username ? `@${data.username}` : ''}</span>
                    </div>
                </div>
            ) : (
                <div className="text-muted-foreground">Select a chat</div>
            )}
    </div>
    )
}
