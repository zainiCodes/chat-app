import getUser from '@/hooks/useUser'
import { Separator } from '@chat-app/ui/components/separator'
import UserProfile from './components/user-profile'
export default function SettingsComponent() {
    return (
        <div className="container mx-auto w-full">
            <UserProfile />
        </div >
    )
}
