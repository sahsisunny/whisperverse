import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoMdLogIn } from 'react-icons/io'
import { MdLockReset } from 'react-icons/md'

import {
   useLoginEmailMutation,
   useLoginUsernameMutation,
} from '@/app/services/userApi'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import { API } from '@/constants'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import useToast from '@/hooks/useToast'

import LoginImage from '../../../public/login.jpg'

function LoginForm() {
   const { showToast, toasts } = useToast()

   const [inputType, setInputType] = useState('email')
   const [emailLogin, { isLoading: emailLoginLoading }] =
      useLoginEmailMutation()
   const [usernameLogin, { isLoading: usernameLoginLoading }] =
      useLoginUsernameMutation()
   const { isLoggedin } = useIsAuthenticated()
   if (isLoggedin) {
      Router.push('/')
   }
   const toggleInputType = () => {
      setInputType((prevType) => (prevType === 'email' ? 'username' : 'email'))
      showToast(
         `Switched to ${inputType === 'email' ? 'Username' : 'Email'}`,
         3000,
         'success',
      )
   }

   const handleSubmitwithEmail = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const email = data.get('email') as string
      const password = data.get('password') as string
      emailLogin({ email, password })
         .unwrap()
         .then(() => {
            Router.push('/')
         })
         .catch((error) => {
            showToast(error.data.error, 3000, 'error')
         })
   }

   const handleSubmitwithUsername = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const username = data.get('username') as string
      const password = data.get('password') as string
      usernameLogin({ username, password })
         .unwrap()
         .then(() => {
            Router.push('/')
         })
         .catch((error) => {
            showToast(error.data.error, 3000, 'error')
         })
   }

   return (
      <div className="flex lg:flex-row flex-col justify-center w-full ">
         <div className="mx-auto lg:flex hidden flex-col gap-3  w-[50%] ">
            <Image
               src={LoginImage}
               alt="Login"
               className="w-full lg:h-full h-auto object-cover rounded-s-[30px]  "
               width={500}
               height={500}
            />
         </div>

         <div className="mx-auto flex flex-col gap-3 p-6 lg:w-[50%] w-full lg:rounded-e-[30px] lg:rounded-s-none rounded-[30px]   bg-white border-l-2 text-black">
            <h1 className="text-4xl font-bold text-center">Sign In</h1>
            <p className="text-center">
               Sign in with Google to start using Whisper Verse.
            </p>
            <Link
               type="button"
               className="flex justify-center item-center bg-gray-100 border py-2 px-4 rounded-md hover:bg-gray-200  items-center gap-2"
               href={`${API}/auth/google`}
            >
               <FcGoogle className="inline-block mr-2" /> Sign In With Google
            </Link>
            <div className="flex items-center gap-4">
               <hr className="flex-1" />
               <span>OR</span>
               <hr className="flex-1" />
            </div>
            <form
               className="flex flex-col gap-4"
               onSubmit={
                  inputType === 'email'
                     ? handleSubmitwithEmail
                     : handleSubmitwithUsername
               }
            >
               <div>
                  <label
                     htmlFor={inputType}
                     className="block text-sm font-medium text-gray-600"
                  >
                     {inputType === 'email' ? 'Email' : 'Username'}
                  </label>
                  <input
                     type="text"
                     id={inputType}
                     name={inputType}
                     placeholder={`Enter ${inputType}`}
                     required
                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
               </div>
               <div>
                  <label
                     htmlFor="password"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Password"
                     minLength={8}
                     required
                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
               </div>
               <Link
                  href="/password-reset"
                  className="text-black hover:underline flex items-center justify-end"
               >
                  <MdLockReset className="inline-block mr-2" />
                  Forgot Password?
               </Link>
               <Button
                  isLoading={
                     inputType === 'email'
                        ? emailLoginLoading
                        : usernameLoginLoading
                  }
                  onClick={() => {}}
               >
                  <IoMdLogIn className="inline-block mr-2" />
                  <span>
                     {inputType === 'email'
                        ? 'Login with Email'
                        : 'Login with Username'}
                  </span>
               </Button>
            </form>
            <div className="flex flex-col text-center mt-4">
               <button
                  type="button"
                  className="text-black hover:underline"
                  onClick={toggleInputType}
               >
                  Switch to {inputType === 'email' ? 'Username' : 'Email'}
               </button>
            </div>
         </div>
         {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
         ))}
      </div>
   )
}

export default LoginForm
