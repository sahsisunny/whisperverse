import ContactForm from '@/components/contact/ContactForm'
import Layout from '@/components/Layout'

export default function ContactUs() {
   return (
      <Layout title="Contact Us - WhisperVerse">
         <section className="flex flex-col justify-center sm:p-20 p-6 py-16 my-auto">
            <div className="mx-auto flex flex-col gap-6 p-6 shadow text-black bg-white rounded-[20px] w-full">
               <h1 className="text-3xl font-bold mb-4 text-center underline">
                  Contact Us at WhisperVerse
               </h1>

               <p>
                  We'd love to hear from you! Please use the form below to send
                  us a message.
               </p>

               <h2 className="text-xl font-bold mt-6">Contact Form</h2>
               <ContactForm />

               <p className="mt-8">
                  We appreciate your feedback and will get back to you as soon
                  as possible. Thank you for reaching out to WhisperVerse!
               </p>
            </div>
         </section>
      </Layout>
   )
}
