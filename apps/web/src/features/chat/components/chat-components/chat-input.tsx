// import { User } from '@/hooks/useUser'
import { Input } from '@chat-app/ui/components/input'
import { useForm } from '@tanstack/react-form'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLoaderData } from '@tanstack/react-router'
import { Send, Plus } from 'lucide-react'
import z from 'zod'
import type { Message } from "@/hooks/getMessagesbyid"

export default function ChatInput({ sharedData }: { sharedData: { id: string, conversationId: string } }) {
    const loggedInuser = useLoaderData({ from: "/_app/" })
    const qc = useQueryClient()
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
        },
        onMutate: async ({ conversationId, senderId, content }: { conversationId: string, senderId: string, content: string }) => {
            qc.cancelQueries({ queryKey: ["Messages", conversationId] })
            const prevChats = qc.getQueryData(["ChatList"])
            qc.setQueryData(["Messages", conversationId], (prev: any) => {
                if (!prev) return prev
                const dummyMessage: Message = {
                    conversationId: conversationId,
                    content: content,
                    createdAt: new Date,
                    updatedAt: new Date,
                    id: "temp-" + Date.now(),
                    deletedAt: null,
                    editedAt: null,
                    isDeleted: false,
                    mediaUrl: null,
                    mimeType: null,
                    replyToId: null,
                    senderId: senderId,
                    type: "TEXT",
                    seq: prev.length + 1,
                    sender: {
                        id: loggedInuser.session.user.id,
                        image: null,
                        name: loggedInuser.session.user.name
                    }
                }
                return {
                    ...prev,
                    allMessages: [
                        ...prev.allMessages,
                        dummyMessage,
                    ]
                }
            })

            return { prevChats }
        },
        onError: (_err, _, context) => {
            qc.setQueryData(["ChatList"], context?.prevChats)
        },
        onSettled: (_, _var, data) => {
            qc.invalidateQueries({ queryKey: ["Messages", data.conversationId] })
            qc.invalidateQueries({ queryKey: ["ChatList"] })
        }

    })
    const form = useForm({
        defaultValues: {
            input: "",
        },
        onSubmit: ({ value }) => {
            if (value.input == "") {
                return null
            }
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
