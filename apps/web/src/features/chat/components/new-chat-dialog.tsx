import useFriendList from '@/hooks/useFriendsList'
import React from 'react'

export default function NewChatDialog() {
    const { data, isPending } = useFriendList()
    return (
        <div></div>
    )
}
