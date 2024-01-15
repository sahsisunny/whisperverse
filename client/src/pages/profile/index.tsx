import React, { useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { RiAiGenerate } from 'react-icons/ri'

import {
   useCreatePasswordResetMutation,
   useDeletePasswordResetMutation,
   useGetPasswordResetQuery,
} from '@/app/services/passwordResetApi'
import Button from '@/components/Button'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import NotLoggedIn from '@/components/NotLoggedIn'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

export default function ProfilePage() {
   const CREATE_MUTATION = useCreatePasswordResetMutation()
   const DELETE_MUTATION = useDeletePasswordResetMutation()
   const {
      data: passwordResetData,
      isLoading: passwordResetLoading,
      refetch: fetchResetToken,
   } = useGetPasswordResetQuery()

   const {
      data: userData,
      isLoading: userLoading,
      isLoggedin,
   } = useIsAuthenticated()

   const [createResetToken, { isLoading: createResetTokenLoading }] =
      CREATE_MUTATION
   const [deleteResetToken, { isLoading: deleteResetTokenLoading }] =
      DELETE_MUTATION

   const [resetToken, setResetToken] = useState(
      passwordResetData?.passwordReset.resetToken ||
         'Click "Show Token" to see your token',
   )
   const [showToken, setShowToken] = useState(true)
   if (!isLoggedin) return <NotLoggedIn />
   if (userLoading) return <Loader />

   const handleCreateResetToken = async () => {
      await createResetToken()
         .unwrap()
         .then((data) => {
            setResetToken(data.passwordReset.resetToken)
            setShowToken(true)
         })
         .catch((err) => console.log(err))
   }

   const handleDeleteResetToken = async () => {
      await deleteResetToken()
         .unwrap()
         .then(() => {
            setResetToken('')
            setShowToken(false)
         })
         .catch((err) => console.log(err))
   }

   const handleFetchResetToken = async () => {
      await fetchResetToken()
         .unwrap()
         .then((data) => {
            setResetToken(data.passwordReset.resetToken)
         })
         .catch((err) => console.log(err))
   }

   return (
      <Layout title="Account - Whisper Verse">
         <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
            <div className="flex flex-col gap-4 w-[80%] p-4">
               <h1 className="text-2xl font-bold text-center">
                  Account Settings
               </h1>
               <h2 className="text-xl font-bold underline">User Information</h2>
               <p className="">
                  Name: {userData?.name}
                  <br />
                  Email: {userData?.email}
                  <br />
                  Username: {userData?.username}
               </p>
               <h2 className="text-xl font-bold underline">Password Reset</h2>
               <p className="mb-4">
                  You can create a password reset token here. This token can be
                  used to reset your password if you forget it.
               </p>
               <div className="flex flex-col w-full">
                  {passwordResetData?.passwordReset && showToken ? (
                     <div className="flex flex-col gap-2  w-full">
                        <p className="text-gray-200">Your reset token is:</p>
                        <p className="text-gray-200 w-full ">{resetToken}</p>
                        <div className="flex flex-row gap-2">
                           <Button
                              onClick={handleFetchResetToken}
                              isLoading={createResetTokenLoading}
                           >
                              <RiAiGenerate /> Show Token
                           </Button>
                           <Button
                              onClick={() =>
                                 navigator.clipboard.writeText(resetToken)
                              }
                           >
                              <FaCopy /> Copy
                           </Button>
                           <Button
                              onClick={handleDeleteResetToken}
                              isLoading={deleteResetTokenLoading}
                           >
                              <MdDelete /> Delete Token
                           </Button>
                        </div>
                     </div>
                  ) : (
                     <Button
                        onClick={handleCreateResetToken}
                        isLoading={createResetTokenLoading}
                     >
                        <RiAiGenerate /> Create or Update Token
                     </Button>
                  )}
               </div>
            </div>
         </section>
      </Layout>
   )
}
