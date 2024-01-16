import Image from 'next/image'
import Router from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { MdLockReset } from 'react-icons/md'

import { useResetPasswordMutation } from '@/app/services/passwordResetApi'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import useToast from '@/hooks/useToast'

import RoginImageImage from '../../../public/register.jpg'

interface FormData {
   email?: string
   username?: string
   resetToken: string
   newPassword: string
   confirmPassword?: string
}

interface FormErrors {
   email?: string
   username?: string
   resetToken?: string
   newPassword?: string
   confirmPassword?: string
}

export default function PasswordResetForm() {
   const { showToast, toasts } = useToast()

   const RESET_MUTATION = useResetPasswordMutation()
   const [formData, setFormData] = useState<FormData>({
      email: '',
      username: '',
      resetToken: '',
      newPassword: '',
      confirmPassword: '',
   })

   const [errors, setErrors] = useState<FormErrors>({})

   const [resetPassword, { isLoading }] = RESET_MUTATION

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()

      const newErrors: FormErrors = {}

      if (!formData.email?.trim() && !formData.username?.trim()) {
         showToast('Email or Username is required', 3000, 'error')
      }

      if (!formData.resetToken.trim()) {
         showToast('Reset Token is required', 3000, 'error')
      }

      if (!formData.newPassword.trim()) {
         showToast('Password is required', 3000, 'error')
      }

      if (formData.newPassword !== formData.confirmPassword) {
         showToast('Passwords do not match', 3000, 'error')
      }

      setErrors(newErrors)

      if (Object.keys(newErrors).length === 0) {
         const { confirmPassword, ...data } = formData
         if (!data.email) delete data.email
         if (!data.username) delete data.username

         await resetPassword(data)
            .unwrap()
            .then(() => {
               setFormData({
                  email: '',
                  username: '',
                  resetToken: '',
                  newPassword: '',
                  confirmPassword: '',
               })
               Router.push('/login')
            })
            .catch((error) => {
               showToast(
                  error.data?.error || error.data?.message,
                  3000,
                  'error',
               )
            })
      }
   }

   return (
      <div className="flex lg:flex-row flex-col justify-center w-full ">
         <div className="mx-auto lg:flex hidden flex-col gap-3  w-[50%] ">
            <Image
               src={RoginImageImage}
               alt="Login"
               className="w-full h-full object-cover rounded-s-[30px]"
               width={450}
               height={450}
            />
         </div>

         <div className="mx-auto flex flex-col justify-center  gap-3 p-6 lg:w-[50%] w-full lg:rounded-e-[30px] lg:rounded-s-none rounded-[30px]   bg-white border-l-2 text-black">
            <h1 className="text-4xl font-bold text-center">Password Reset</h1>
            <p className="text-center">
               Enter the below details to reset your password
            </p>

            <form
               className="flex flex-col gap-4  text-black"
               onSubmit={handleSubmit}
            >
               <div>
                  <label
                     htmlFor="username"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Username
                  </label>
                  <input
                     type="text"
                     id="username"
                     name="username"
                     placeholder="Username"
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.username ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.username && (
                     <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
               </div>
               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Email"
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.email ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.email && (
                     <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
               </div>
               <div>
                  <label
                     htmlFor="resetToken"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Reset Token
                  </label>
                  <input
                     type="text"
                     id="resetToken"
                     name="resetToken"
                     placeholder="Reset Token"
                     required
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.resetToken ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.resetToken && (
                     <p className="text-red-500 text-sm">{errors.resetToken}</p>
                  )}
               </div>
               <div>
                  <label
                     htmlFor="newPassword"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="newPassword"
                     name="newPassword"
                     placeholder="New Password"
                     minLength={8}
                     required
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.newPassword ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.newPassword && (
                     <p className="text-red-500 text-sm">
                        {errors.newPassword}
                     </p>
                  )}
               </div>
               <div>
                  <label
                     htmlFor="confirmPassword"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Confirm Password
                  </label>
                  <input
                     type="password"
                     id="confirmPassword"
                     name="confirmPassword"
                     placeholder="Confirm Password"
                     minLength={8}
                     required
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.confirmPassword ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                     <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                     </p>
                  )}
               </div>
               <Button onClick={() => {}} isLoading={isLoading}>
                  <MdLockReset className="mr-2" /> Reset Password
               </Button>
            </form>
         </div>
         {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
         ))}
      </div>
   )
}
