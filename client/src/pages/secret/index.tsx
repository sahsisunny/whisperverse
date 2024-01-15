import { useState } from 'react'

import {
   useAddOrUpdateSecretMutation,
   useDeleteSecretMutation,
   useGetSecretQuery,
} from '@/app/services/secretsApi'
import Button from '@/components/Button'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import NotLoggedIn from '@/components/NotLoggedIn'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

export default function EditSecret() {
   const DELETE_MUTATION = useDeleteSecretMutation()
   const ADD_OR_UPDATE_MUTATION = useAddOrUpdateSecretMutation()
   const {
      data: userData,
      isLoading: userIsLoading,
      isLoggedin,
   } = useIsAuthenticated()
   const { data: secretData, isLoading } = useGetSecretQuery(
      userData?.id || '',
      { skip: !userData?.id },
   )
   const [deleteSecret] = DELETE_MUTATION
   const [addOrupdateSecret, { isLoading: isAddingOrUpdating }] =
      ADD_OR_UPDATE_MUTATION

   const [updatedSecret, setUpdatedSecret] = useState(secretData?.message || '')
   const [secretMessage, setSecretMessage] = useState(secretData?.message || '')
   const [showTextArea, setShowTextArea] = useState(false)

   if (!isLoggedin) return <NotLoggedIn />
   if (isLoading || userIsLoading) return <Loader />

   const handleAddOrUpdateSecret = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault()
      const secretText = e.currentTarget.secret?.value
      if (secretText) {
         const data = {
            secret: secretText,
         }
         await addOrupdateSecret(data)
            .unwrap()
            .then(async () => {
               setUpdatedSecret('')
               setSecretMessage(secretText)
               setShowTextArea(false)
            })
            .catch((err) => console.log(err))
      }
   }
   const handleDeleteSecret = async () => {
      if (window.confirm('Are you sure you want to delete this secret?')) {
         await deleteSecret(userData?.id || '')
            .unwrap()
            .then(() => {
               setUpdatedSecret('')
               setShowTextArea(true)
            })
            .catch((err) => console.log(err))
      }
   }

   return (
      <Layout title="Edit Secret - Whisper Verse">
         <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
            <form
               className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/2"
               onSubmit={handleAddOrUpdateSecret}
            >
               <div className="flex flex-col gap-4 items-center justify-center w-full">
                  <label
                     htmlFor="secret"
                     className="block text-sm font-medium text-gray-200"
                  >
                     Secret Message
                  </label>
                  {secretData?.message && !showTextArea ? (
                     <div>
                        <p>{secretData.message}</p>
                        <div className="flex gap-4 mt-4">
                           <Button
                              isLoading={isAddingOrUpdating}
                              onClick={() => setShowTextArea(true)}
                           >
                              Edit
                           </Button>
                           <Button onClick={handleDeleteSecret}>Delete</Button>
                        </div>
                     </div>
                  ) : (
                     <>
                        <textarea
                           id="secret"
                           name="secret"
                           value={updatedSecret}
                           defaultValue={secretMessage}
                           onChange={(e) => setUpdatedSecret(e.target.value)}
                           placeholder={`Enter Secret`}
                           required
                           minLength={20}
                           maxLength={1000}
                           className="mt-1 p-2 border border-gray-300 text-black rounded-md w-full min-h-[50vh]"
                        />
                        <div className="flex gap-4 mt-4">
                           <Button
                              isLoading={isAddingOrUpdating}
                              onClick={() => {}}
                           >
                              Save
                           </Button>
                        </div>
                     </>
                  )}
               </div>
            </form>
         </section>
      </Layout>
   )
}
