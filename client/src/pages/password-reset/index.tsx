import PasswordResetForm from '@/components/form/PasswordResetForm'
import Layout from '@/components/Layout'

export default function PasswordResetPage() {
   return (
      <Layout title="Password Reset - Whisper Verse">
         <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
            <PasswordResetForm />
         </section>
      </Layout>
   )
}
