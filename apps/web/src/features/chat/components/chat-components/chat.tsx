import { use, useEffect } from 'react'
import { ChatContext } from '@/features/chat/chat-context'
import useUserById from '@/hooks/useUserById'
import ChatInput from './chat-input'
import ChatHeader from './chat-header'
import ChatBody from './chat-body'

export default function Chat() {
    const SharedData = use(ChatContext)
    const { data, isPending } = useUserById(SharedData.id)

    if (!data) {
        return (
            <div className='flex items-center justify-center h-full w-full'>
                Chat App
            </div>
        )
    }
    return (
        <div className=" flex flex-col h-full">
            <div className='flex-1'>
                <ChatHeader isPending={isPending} data={data.user} />
            </div>
            <ChatBody conversationId={SharedData.conversationId} />
            <ChatInput sharedData={SharedData} />
        </div>
    )
}
