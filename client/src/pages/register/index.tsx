import RegisterForm from '@/components/form/RegisterForm'
import Layout from '@/components/Layout'

export default function RegisterPage() {
   return (
      <Layout title="Sign Up - Whisper Verse">
         <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
            <RegisterForm />
         </section>
      </Layout>
   )
}
