'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FcGoogle } from 'react-icons/fc'
import RoginImageImage from '../../../public/register.jpg'
import Image from 'next/image'
import { registerUser } from '@/utils/registerUser'
interface FormData {
   username: string
   email: string
   name: string
   password: string
   confirmPassword?: string
}

interface FormErrors {
   username?: string
   email?: string
   name?: string
   password?: string
   confirmPassword?: string
}

function RegisterForm() {
   const [formData, setFormData] = useState<FormData>({
      username: '',
      email: '',
      name: '',
      password: '',
   })

   const [errors, setErrors] = useState<FormErrors>({})

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit =async (e: FormEvent) => {
      e.preventDefault()

      const newErrors: FormErrors = {}
      if (!formData.username.trim()) {
         newErrors.username = 'Username is required'
      }

      if (!formData.email.trim()) {
         newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = 'Invalid email format'
      }

      if (!formData.name.trim()) {
         newErrors.name = 'Name is required'
      }

      if (!formData.password.trim()) {
         newErrors.password = 'Password is required'
      }

      if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = 'Passwords do not match'
      }

      setErrors(newErrors)

      // If there are no errors, you can proceed with form submission or other actions
      if (Object.keys(newErrors).length === 0) {
         // Handle form submission or other actions here
         await registerUser(
            formData.username,
            formData.name,
            formData.email,
             formData.password,
         )
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
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            <p className="text-center">
               Sign up with your details or continue with Google.
            </p>

            <button
               type="button"
               className="flex justify-center item-center bg-gray-100 border py-2 px-4 rounded-md hover:bg-gray-200  items-center gap-2"
            >
               <FcGoogle className="inline-block mr-2" /> Sign Up With Google
            </button>

            <div className="flex items-center gap-4">
               <hr className="flex-1" />
               <span>OR</span>
               <hr className="flex-1" />
            </div>

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
                     required
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
                     required
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
                     htmlFor="name"
                     className="block text-sm font-medium text-gray-600"
                  >
                     Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     placeholder="Name"
                     required
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.name ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.name && (
                     <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
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
                     className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                        errors.password ? 'border-red-500' : ''
                     }`}
                     onChange={handleChange}
                  />
                  {errors.password && (
                     <p className="text-red-500 text-sm">{errors.password}</p>
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
               <button
                  type="submit"
                  className="bg-blue-500  py-2 px-4 rounded-md hover:bg-blue-600 text-white"
               >
                  Sign Up
               </button>
            </form>
         </div>
      </div>
   )
}

export default RegisterForm
