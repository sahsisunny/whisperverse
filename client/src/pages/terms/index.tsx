import React from 'react'

import Layout from '@/components/Layout'

export default function TermsOfService() {
   return (
      <Layout title="Terms of Service - WhisperVerse">
         <section className="flex flex-col justify-center sm:p-20 p-6 py-16 my-auto">
            <div className="mx-auto flex flex-col gap-6 p-6 shadow text-black bg-white rounded-[20px]">
               <h1 className="text-3xl font-bold mb-4 text-center underline">
                  Terms of Service
               </h1>

               <p>
                  Welcome to WhisperVerse! By using WhisperVerse and its
                  services, you agree to comply with and be bound by the
                  following terms and conditions. Please review them carefully.
                  If you do not agree to these terms, please do not use
                  WhisperVerse.
               </p>

               <h2 className="text-xl font-bold mt-6">User Conduct</h2>
               <p>
                  When using WhisperVerse, you agree to:
                  <ul className="">
                     <li>Use WhisperVerse only for lawful purposes</li>
                     <li>Respect the rights and privacy of others</li>
                  </ul>
               </p>

               <h2 className="text-xl font-bold mt-6">Intellectual Property</h2>
               <p>
                  WhisperVerse and its content, features, and functionality are
                  owned by WhisperVerse and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property or proprietary rights laws.
               </p>

               <h2 className="text-xl font-bold mt-6">Disclaimer</h2>
               <p>
                  WhisperVerse is provided "as is" and "as available" without
                  any representations or warranties, expressed or implied.
                  WhisperVerse makes no representations or warranties in
                  relation to the use or completeness of the information on the
                  platform.
               </p>

               <h2 className="text-xl font-bold mt-6">Contact Us</h2>
               <p>
                  If you have any questions or concerns about our Terms of
                  Service, please feel free to reach out to us at:
                  <span className="italic">sahsisunny@gmail.com</span>
               </p>

               <p className="mt-8">
                  Thank you for using WhisperVerse responsibly. Your compliance
                  with these terms helps us provide a safe and enjoyable
                  platform for everyone.
               </p>
            </div>
         </section>
      </Layout>
   )
}
