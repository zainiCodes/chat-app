import React, { useContext } from 'react'
import { ChatContext } from '../../index'
import useUserById from '@/hooks/useUserById'
import { Avatar, AvatarFallback, AvatarImage } from '@chat-app/ui/components/avatar'
import { Input } from '@chat-app/ui/components/input'
import ChatInput from './chat-input'
import ChatHeader from './chat-header'

export default function Chat() {
    const SharedData = useContext(ChatContext)
    const { data, isPending } = useUserById(SharedData.id)

    if (!data) {
        return (
            <div className='flex items-center justify-center h-full w-full'>
                Chat App
            </div>
        )
    }
    return (
        <div className="flex-1 flex flex-col justify-between h-full">
            <ChatHeader isPending={isPending} data={data.user} />
            <ChatInput sharedData={SharedData} />
        </div>
    )
}
