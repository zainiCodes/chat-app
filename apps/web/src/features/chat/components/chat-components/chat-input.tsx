// import { User } from '@/hooks/useUser'
import { Input } from '@chat-app/ui/components/input'
import { useForm } from '@tanstack/react-form'
import { Send, Plus } from 'lucide-react'
import z from 'zod'

export default function ChatInput({ sharedData }: { sharedData: { id: string, conversationId: string } }) {
    const form = useForm({
        defaultValues: {
            input: ""
        },
        onSubmit: ({ value }) => {
            console.log(value.input)
            form.reset()
        },
        validators: {
            onSubmit: z.object({
                input: z.string("")
            })
        },
    })
    return (
        <div className='px-3 py-3 flex gap-2 items-center'>
            <Plus className='cursor-pointer' />
            <form.Field name='input'>
                {(field) => (
                    <div className='w-full rounded-xl'>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            placeholder='Type your message...'
                            onChange={(e) => field.handleChange(e.target.value)}
                            className='rounded-xl'
                        />
                    </div>
                )}
            </form.Field>
            <Send className='text-primary cursor-pointer' onClick={() => { form.handleSubmit() }} />
        </div>
    )
}
