import React from 'react'
import SignUpForm from './component/sign-up-form'
import myImage from '@/assets/LoginImage.jpg'

export default function SignUpPage() {
    return (
        <div className='flex w-full h-screen'>
            <div className='w-1/2 flex items-center justify-center'>
                <SignUpForm />
            </div>
            <img className='w-1/2 h-screen' src={myImage} alt="login page image" />
        </div>
    )
}
