import React from 'react'
import LoginForm from './component/sign-in-form'
import myImage from '@/assets/LoginImage.jpg'

export default function loginPage() {
    return (
        <div className='flex w-full h-screen'>
            <img className='w-1/2 h-screen hidden md:block' src={myImage} alt="login page
            " />
            <div className='w-full md:w-1/2 flex items-center justify-center'>
                <LoginForm />
            </div>
        </div>
    )
}
