import SettingsComponent from '@/features/settings';
import SettingsSkeleton from '@/helper-component/skeletons/setting-skeleton';
import { authClient } from '@/lib/auth-client';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings')({
    component: SettingsComponent,
    pendingComponent: SettingsSkeleton, // ← replaces the generic spinner
    pendingMs: 300,
    beforeLoad: async () => {
        const session = await authClient.getSession();

        if (!session.data) {
            throw redirect({
                to: "/login",
            });
        }

        return {
            session: session.data,
        };
    },
})


