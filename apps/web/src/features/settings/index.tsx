import getUser from '@/hooks/getUser'
import { Separator } from '@chat-app/ui/components/separator'
import UserProfile from './components/user-profile'
export default function SettingsComponent() {
    const user = getUser()
    return (
        <div className="container mx-auto">
            <h1 className='text-4xl font-medium text-[#2629e0]'>Settings</h1>

            <UserProfile />


        </div >
    )
}
