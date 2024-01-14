import LoginForm from '@/components/form/LoginForm'
import Layout from '@/components/Layout'

export default function Login() {
   return (
      <Layout title="Sign In - WhisperVerse">
         <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
            <LoginForm />
         </section>
      </Layout>
   )
}
