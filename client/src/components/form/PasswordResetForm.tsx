import Image from 'next/image'
import Router from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { useResetPasswordMutation } from '@/app/services/passwordResetApi'
import Button from '@/components/Button'

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
         newErrors.email = 'Email or Username is required'
         newErrors.username = 'Email or Username is required'
      }

      if (!formData.resetToken.trim()) {
         newErrors.resetToken = 'Reset Token is required'
      }

      if (!formData.newPassword.trim()) {
         newErrors.newPassword = 'Password is required'
      }

      if (formData.newPassword !== formData.confirmPassword) {
         newErrors.confirmPassword = 'Passwords do not match'
      }

      setErrors(newErrors)

      if (Object.keys(newErrors).length === 0) {
         const { confirmPassword, ...data } = formData
         if (!data.email) delete data.email
         if (!data.username) delete data.username

         try {
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
               .catch((err) => {
                  setErrors(err.data)
                  console.error('Error resetting password:', err)
               })
         } catch (error) {
            console.error('Error resetting password:', error)
         }
      }
   }

   return (
      <div className="flex lg:flex-row flex-col justify-center w-full ">
         <div className="mx-auto lg:flex hidden flex-col gap-3  w-[50%] ">
            <Image
               src={RoginImageImage}
               alt="Login"
               className="w-full h-full object-cover rounded-s-[30px]"
               width={500}
               height={500}
            />
         </div>

         <div className="mx-auto flex flex-col gap-3 p-6 lg:w-[50%] w-full lg:rounded-e-[30px] lg:rounded-s-none rounded-[30px]   bg-white border-l-2 text-black">
            <h1 className="text-4xl font-bold text-center">Password Reset</h1>
            <p className="text-center">
               Enter the below details to reset your password
            </p>

            <form
               className="flex flex-col gap-4 text-black"
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
                  Sign Up
               </Button>
            </form>
         </div>
      </div>
   )
}
