import Link from 'next/link'
import React from 'react'

import Layout from '@/components/Layout'

function NotLoggedIn() {
   return (
      <Layout title="Edit Secret - WhisperVerse">
         <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto text-white">
            <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/2">
               <h1 className="text-3xl font-bold text-white mb-4">
                  Oops! You are not logged in.
               </h1>
               <p className="text-lg text-gray-200 mb-8">
                  Log in to access this page.
               </p>
               <Link
                  href="/login"
                  className="bg-blue-500 text-white py-2 px-4 rounded relative"
               >
                  Log In
               </Link>
            </div>
         </section>
      </Layout>
   )
}

export default NotLoggedIn
