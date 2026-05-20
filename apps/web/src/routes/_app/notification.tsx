import notificationsComponent from '@/features/notification'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/notification')({
  component: notificationsComponent,
})
