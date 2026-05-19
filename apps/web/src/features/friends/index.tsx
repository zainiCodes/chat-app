import { Input } from "@chat-app/ui/components/input";
import { Field } from "@chat-app/ui/components/field";
import FriendsProfile from "./components/friend-profile";
import FriendsList from "./components/friends-list";
import { Button } from "@chat-app/ui/components/button";
import { createContext, useState } from "react";

export const UserIdContext = createContext("")

export default function FriendsComponent() {
    const [userId, setUserId] = useState("")
    return (
        <UserIdContext.Provider value={userId} >
            <div className="flex gap-4 h-full overflow-hidden">
                <div className="w-2/5 h-full flex flex-col">
                    <div className="mb-4">
                        <Field orientation="horizontal">
                            <Input type="search" placeholder="Search..." />
                            <Button>Search</Button>
                        </Field>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <FriendsList viewProfile={setUserId} />
                    </div>
                </div>
                <div className="w-3/5 h-full overflow-hidden border rounded-lg bg-slate-50">
                    <FriendsProfile />
                </div>
            </div>
        </UserIdContext.Provider>
    )
}