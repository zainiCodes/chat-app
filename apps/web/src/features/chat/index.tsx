// side bar things are in @chat-app/ui/component/sidebar
import { Route } from "@/routes/_app/index"
import { Button } from "@chat-app/ui/components/button"
import { Input } from "@chat-app/ui/components/input"
import { Field } from "@chat-app/ui/components/field"
import { useLoaderData } from "@tanstack/react-router"
import ChatList from "./components/chat-list"
import Chat from "./components/chat"
import { createContext, useState } from "react"

export const ChatContext = createContext("")

export function ChatComponet() {
    const auth = useLoaderData({ from: "/_app/" })
    const [id, setId] = useState("")
    return (
        <ChatContext.Provider value={id}>
            <div className="flex gap-4 h-full overflow-hidden">
                <div className="w-2/5 h-full flex flex-col">
                    <div className="mb-4">
                        <Field orientation="horizontal">
                            <Input type="search" placeholder="Search..." />
                            <Button>Search</Button>
                        </Field>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-lg font-semibold text-foreground">Chat</h2>
                        <ChatList setId={setId} />
                    </div>
                </div>
                <div className="w-3/5 h-full overflow-hidden border bg-slate-50">
                    <Chat />
                </div>
            </div>
        </ChatContext.Provider>
    )
}