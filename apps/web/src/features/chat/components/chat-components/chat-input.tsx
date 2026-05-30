import { Button } from '@chat-app/ui/components/button'
import { Input } from '@chat-app/ui/components/input'
import React from 'react'
import { Send, Plus } from 'lucide-react'


export default function ChatInput() {
    return (
        <div className='px-3 py-3 flex gap-2 items-center'>
            <Plus />
            <Input placeholder='type message' className='rounded-lg ' />

            <Send className='text-primary cursor-pointer' />

        </div>
    )
}
