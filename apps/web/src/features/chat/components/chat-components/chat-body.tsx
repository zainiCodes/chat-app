import useGetMessagebyId from '@/hooks/getMessagesbyid'
import React from 'react'

export default function ChatBody({ conversationId }: { conversationId: string }) {
    const { data, isPending } = useGetMessagebyId(conversationId)
    if (!data?.allMessages || data.allMessages.length === 0) {
        return (
            <div className='flex h-full w-full justify-center items-center'>
                No messages to show yet!
            </div>
        )
    }
    return (
        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-2'>
            {data.allMessages.map((msg) => (
                <div key={msg.id}>{msg.content}</div>
            ))}
        </div>
    )
}
