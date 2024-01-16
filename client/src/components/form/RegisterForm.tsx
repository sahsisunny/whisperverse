import Image from 'next/image'
import Router from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdAccountCircle } from 'react-icons/md'

import { useRegisterMutation } from '@/app/services/userApi'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import useToast from '@/hooks/useToast'
import { API } from '@/constants'
import RoginImageImage from '../../../public/register.jpg'
import Link from 'next/link'

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
   const { showToast, toasts } = useToast()
   const [formData, setFormData] = useState<FormData>({
      username: '',
      email: '',
      name: '',
      password: '',
   })

   const [errors, setErrors] = useState<FormErrors>({})

   const { isLoggedin } = useIsAuthenticated()

   if (isLoggedin) {
      Router.push('/')
   }
   const [registerUser, { isLoading: registerLoading }] = useRegisterMutation()

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()

      const newErrors: FormErrors = {}

      if (!formData.username.trim()) {
         newErrors.username = 'Username is required'
      } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
         newErrors.username = 'Username is invalid'
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

      if (Object.keys(newErrors).length === 0) {
         const { confirmPassword, ...data } = formData
         registerUser(data)
            .unwrap()
            .then(() => {
               Router.push('/')
            })
            .catch((error) => {
               showToast(error.data?.error, 3000, 'error')
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
               width={500}
               height={500}
            />
         </div>

         <div className="mx-auto flex flex-col gap-3 p-6 lg:w-[50%] w-full lg:rounded-e-[30px] lg:rounded-s-none rounded-[30px]   bg-white border-l-2 text-black">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            <p className="text-center">
               Sign up with your details or continue with Google.
            </p>

            <Link
               className="flex justify-center item-center bg-gray-100 border py-2 px-4 rounded-md hover:bg-gray-200  items-center gap-2"
               href={`${API}/auth/google`}
            >
               <FcGoogle className="inline-block mr-2" /> Sign Up With Google
            </Link>

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
                     minLength={8}
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
                     minLength={8}
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
               <Button isLoading={registerLoading} onClick={() => {}}>
                  <MdAccountCircle className="inline-block mr-2" />
                  Sign Up
               </Button>
            </form>
         </div>
         {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
         ))}
      </div>
   )
}

export default RegisterForm
