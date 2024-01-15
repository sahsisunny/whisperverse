import { useGetAllSecretsQuery } from '@/app/services/secretsApi'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'

export default function HomePage() {
   const { data, isLoading } = useGetAllSecretsQuery()

   if (isLoading) return <Loader />

   return (
      <Layout title="WhisperVerse - All your important links in one place">
         <section className="flex flex-col justify-center items-center text-center lg:p-20 py-28 px-6  gap-6 w-full sm:h-screen">
            <h1 className="text-5xl font-bold">WhisperVerse</h1>
            <h2 className="text-3xl font-semibold">All Secrets in one place</h2>

            <div className="flex flex-col gap-4 items-center justify-center w-full lg:w-1/2">
               <h1 className="text-2xl font-bold text-gray-200">Secret</h1>
            </div>
         </section>
      </Layout>
   )
}
