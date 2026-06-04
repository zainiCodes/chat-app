// import { User } from '@/hooks/useUser'
import { Input } from '@chat-app/ui/components/input'
import { Send, Plus } from 'lucide-react'

export default function ChatInput({ sharedData }: { sharedData: { id: string, conversationId: string } }) {
    return (
        <div className='px-3 py-3 flex gap-2 items-center'>
            <Plus className='cursor-pointer' />
            <Input placeholder='Type Message..' className='rounded-lg border border-black ' />
            <Send className='text-primary cursor-pointer' />
        </div>
    )
}
