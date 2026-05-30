import React, { useContext } from 'react'
import { ChatContext } from '../index'

export default function Chat() {
    const id = useContext(ChatContext)
    return (
        <div>Chat {id}</div>
    )
}
