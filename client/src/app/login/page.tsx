import LoginForm from '@/components/form/LoginForm'

export default function Login() {
   return (
      <section className="flex lg:flex-row flex-col justify-center min-h-[82vh] sm:px-20 p-6 my-auto">
         <LoginForm />
      </section>
   )
}
export function generateMetadata() {
   return {
      title: `Sign In - WhisperVerse`,
      description: `Sign in with Google to start using WhisperVerse.`,
   }
}
