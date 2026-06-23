import { Button } from "@chat-app/ui/components/button"
import { Input } from "@chat-app/ui/components/input"
import { Field } from "@chat-app/ui/components/field"
import ChatList from "./components/chat-list"
import Chat from "./components/chat-components/chat"
import { useContext } from "react"
import { ChatContext } from "./chat-context"

export function ChatComponet() {
    const { setSharedData } = useContext(ChatContext)

    return (
        <div className="flex gap-4 h-full overflow-hidden p-0">
            <div className="w-2/5 h-full flex flex-col">
                <div className="mb-4">
                    <Field orientation="horizontal">
                        <Input type="search" placeholder="Search..." />
                        <Button>Search</Button>
                    </Field>
                </div>
                <div className="flex-1 overflow-hidden">
                    <h2 className="text-lg font-semibold text-foreground">Chat</h2>
                    <ChatList setSharedData={setSharedData} />
                </div>
            </div>
            <div className="w-3/5 h-full overflow-hidden border rounded-lg bg-slate-50">
                <Chat />
            </div>
        </div>
    )
}