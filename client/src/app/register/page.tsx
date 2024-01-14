import RegisterForm from '@/components/form/RegisterForm'

export default function Login() {
   return (
      <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
         <RegisterForm />
      </section>
   )
}
export function generateMetadata() {
   return {
      title: `Sign In - WhisperVerse`,
      description: `Sign in with Google to start using WhisperVerse.`,
   }
}
