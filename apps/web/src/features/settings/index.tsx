import getUser from '@/hooks/getUser'
import { Separator } from '@chat-app/ui/components/separator'
import UserProfile from './components/user-profile'
export default function SettingsComponent() {
    const user = getUser()
    return (
        <div className="container mx-auto ">

            <UserProfile />


        </div >
    )
}
