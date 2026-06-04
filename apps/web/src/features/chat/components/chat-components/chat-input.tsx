import { Input } from '@chat-app/ui/components/input'
import { Send, Plus } from 'lucide-react'

export default function ChatInput() {
    return (
        <div className='px-3 py-3 flex gap-2 items-center'>
            <Plus className='cursor-pointer' />
            <Input placeholder='type message' className='rounded-lg border border-black ' />
            <Send className='text-primary cursor-pointer' />
        </div>
    )
}
