import React, { useContext } from 'react'
import { ChatContext } from '../../index'
import useUserById from '@/hooks/useUserById'
import { Avatar, AvatarFallback, AvatarImage } from '@chat-app/ui/components/avatar'
import { Input } from '@chat-app/ui/components/input'
import ChatInput from './chat-input'

export default function Chat() {
    const id = useContext(ChatContext)
    const { data, isPending } = useUserById(id)
    if (!data) {
        return (
            <div className='flex items-center justify-center h-full w-full'>
                Chat App
            </div>
        )
    }
    return (
        <div className="flex-1 flex flex-col justify-between h-full">
            <div className="border-b flex items-center p-4">
                {isPending ? (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                        <div className="flex flex-col">
                            <div className="h-4 w-20 bg-muted rounded mb-2 animate-pulse" />
                            <div className="h-3 w-12 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                ) : data?.user?.name ? (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border shrink-0">
                            <AvatarImage src={data.user.image || undefined} />
                            <AvatarFallback>{data.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold text-sm">{data.user.name}</h4>
                            <span className="text-[10px] text-muted-foreground">{data.user.username ? `@${data.user.username}` : ''}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-muted-foreground">Select a chat</div>
                )}
            </div>
            <ChatInput />
        </div>
    )
}
