import { Input } from "@chat-app/ui/components/input";
import { Field } from "@chat-app/ui/components/field";
import FriendsProfile from "./components/friend-profile";
import FriendsList from "./components/friends-list";
import { Button } from "@chat-app/ui/components/button";

export default function FriendsComponent() {
    return (
        <div className="flex gap-4">
            <div className="w-2/5 ">
                <Field orientation="horizontal">
                    <Input type="search" placeholder="Search..." />
                    <Button>Search</Button>
                </Field>
                <FriendsList />
            </div>
            <div className="w-3/5 ">
                <FriendsProfile />
            </div>
        </div>
    )
}
