'use client'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import LoginImage from '../../../public/login.jpg'
import Image from 'next/image'
import { API } from '@/constants'
import Link from 'next/link'
import {fetchLoginByUsername} from '@/utils/fetchLogin'

function LoginForm() {
   const [inputType, setInputType] = useState('email') // Default to email

   const toggleInputType = () => {
      setInputType((prevType) => (prevType === 'email' ? 'username' : 'email'))
   }

   const handleSubmitwithEmail = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const email = data.get('username') as string
      const password = data.get('password') as string
      const res = await fetchLoginByUsername(email, password)
   }

   const handleSubmitwithUsername = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const username = data.get('username') as string
      const password = data.get('password') as string
      const res = await fetchLoginByUsername(username, password)
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
               Sign in with Google to start using WhisperVerse.
            </p>
            <Link
               type="button"
               className="flex justify-center item-center bg-gray-100 border py-2 px-4 rounded-md hover:bg-gray-200  items-center gap-2"
               href={`${API}/auth/google/callback`}
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
                     required
                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
               </div>
               <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
               >
                  Sign In
               </button>
            </form>
            <div className="text-center mt-4">
               <button
                  type="button"
                  className="text-black hover:underline"
                  onClick={toggleInputType}
               >
                  Switch to {inputType === 'email' ? 'Username' : 'Email'}
               </button>
            </div>
         </div>
      </div>
   )
}

export default LoginForm
