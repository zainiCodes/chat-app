// import { User } from '@/hooks/useUser'
import { authClient } from '@/lib/auth-client'
import { Input } from '@chat-app/ui/components/input'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useLoaderData } from '@tanstack/react-router'
import { Send, Plus } from 'lucide-react'
import z from 'zod'

export default function ChatInput({ sharedData }: { sharedData: { id: string, conversationId: string } }) {
    const loggedInuser = useLoaderData({ from: "/_app/" })
    const sendMessage = useMutation({
        mutationFn: async ({ conversationId, senderId, content }: { conversationId: string, senderId: string, content: string }) => {
            await fetch("http://localhost:3000/api/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ conversationId, senderId, content }),
            })
        }
    })
    const form = useForm({
        defaultValues: {
            input: "",
        },
        onSubmit: ({ value }) => {
            console.log(value.input)
            sendMessage.mutate({
                conversationId: sharedData.conversationId,
                senderId: loggedInuser.session.user.id,
                content: value.input
            })
            form.reset()
        },
        validators: {
            onSubmit: z.object({
                input: z.string(""),
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
