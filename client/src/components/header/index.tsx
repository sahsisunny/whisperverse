import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaUserSecret } from 'react-icons/fa6'
import { GiSecretBook } from 'react-icons/gi'
import { TbLogout } from 'react-icons/tb'

import { useLogoutMutation } from '@/app/services/userApi'
import Button from '@/components/Button'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import LogoImage from '../../../public/WhisperVerse.webp'

function Header() {
   const { isLoggedin } = useIsAuthenticated()
   const [logout] = useLogoutMutation()
   const handleLogout = async () => {
      logout()
         .unwrap()
         .then(() => {
            window.location.reload()
         })
         .catch((rejectedValueOrSerializedError) => {
            console.log(rejectedValueOrSerializedError)
         })
   }
   return (
      <header className="w-full sticky top-0  z-50  h-[10vh]">
         <div className="w-full mx-auto flex justify-between p-2 bg-white text-black rounded-b-[35px]  ">
            <div className="flex gap-6  ">
               <Link
                  href="/"
                  className="flex items-center text-md font-semibold text-black"
               >
                  <Image
                     src={LogoImage}
                     width={40}
                     height={40}
                     alt="Whisper Verse Logo"
                     className="rounded-full cursor-pointer"
                  />

                  <span>Whisper Verse</span>
               </Link>
               <nav className="md:flex items-center text-black font-semibold text-sm hidden ">
                  <Link
                     href="/"
                     className="flex gap-2 py-3 px-5 hover:bg-gray-100 rounded-[10px]"
                  >
                     <GiSecretBook className="text-xl" />
                     All Secrets
                  </Link>
                  <Link
                     href="/secret"
                     className="flex gap-2 py-3 px-5 hover:bg-gray-100 rounded-[10px]"
                  >
                     <FaUserSecret className="text-xl" />
                     My Secret
                  </Link>
                  <Link
                     href="/profile"
                     className="flex gap-2 py-3 px-5 hover:bg-gray-100 rounded-[10px]"
                  >
                     <CgProfile className="text-xl" />
                     Profile
                  </Link>
               </nav>
            </div>
            {isLoggedin ? (
               <nav className="flex gap-4 text-sm  items-center">
                  <Button
                     onClick={handleLogout}
                     className="flex justify-center items-center  gap-2 py-3 px-5 hover:bg-gray-200 rounded-l-[10px] rounded-br-[35px] bg-gray-300"
                  >
                     Logout
                     <TbLogout className="text-xl" />
                  </Button>
               </nav>
            ) : (
               <nav className="flex gap-2 text-sm text-black items-center">
                  <Link
                     href="/login"
                     className=" py-3 px-5 hover:bg-gray-200 rounded-[10px] bg-gray-100"
                  >
                     Sign in
                  </Link>
                  <Link
                     href="/register"
                     className=" py-3 px-5 hover:bg-gray-200 rounded-[10px] bg-gray-100"
                  >
                     Sign up
                  </Link>
               </nav>
            )}
         </div>
      </header>
   )
}

export default Header
