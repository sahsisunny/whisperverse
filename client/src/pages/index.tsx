import { useGetAllSecretsQuery } from '@/app/services/secretsApi'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import Link from 'next/link'

export default function HomePage() {
   const { data: secretsData, isLoading } = useGetAllSecretsQuery()

   if (isLoading) return <Loader />

   return (
      <Layout title="WhisperVerse - All your important links in one place">
         <section className="flex flex-col justify-center items-center text-center lg:p-20 py-28 px-6  gap-6 w-full">
            <h1 className="text-5xl font-bold">WhisperVerse</h1>
            <h2 className="text-3xl font-semibold">All Secrets in one place</h2>

            <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/2">
               <div className="mb-6">
                  <Link
                     className="bg-blue-500 text-white py-2 px-4 rounded"
                     href="/edit-secret"
                  >
                     Share Your Secret
                  </Link>
               </div>

               <h1 className="text-2xl font-bold text-gray-200">
                  Latest Secrets
               </h1>
               <div className="flex flex-wrap gap-4 items-center justify-center w-full">
                  {secretsData?.secrets.map((secret) => (
                     <div
                        key={secret._id}
                        className="flex flex-wrap gap-4 items-center justify-center w-auto border"
                     >
                        <p>{secret.secret}</p>
                        <div className="flex flex-row justify-between px-4 gap-4 items-center  w-full">
                           <p className="text-xs text-gray-200">
                              {new Date(secret.timestamp).toLocaleString()}
                           </p>
                           <p className="text-xs text-gray-200">
                              - Anonymous User
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </Layout>
   )
}
