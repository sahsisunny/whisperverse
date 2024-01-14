import React from 'react'

const appName = 'WhisperVerse' // Replace with your actual app name

export default function TermsOfService() {
   return (
      <section className="flex flex-col justify-center sm:p-20 p-6 py-16 my-auto">
         <div className="mx-auto flex flex-col gap-6 p-6 shadow text-black bg-white rounded-[20px]">
            <h1 className="text-3xl font-bold mb-4 text-center underline">
               Terms of Service for {appName}
            </h1>

            <p>
               Welcome to {appName}! By using {appName} and its services, you
               agree to comply with and be bound by the following terms and
               conditions. Please review them carefully. If you do not agree to
               these terms, please do not use {appName}.
            </p>

            {/* Add more sections based on your terms and conditions */}

            <h2 className="text-xl font-bold mt-6">User Conduct</h2>
            <p>
               When using {appName}, you agree to:
               <ul className="">
                  <li>Use {appName} only for lawful purposes</li>
                  <li>Respect the rights and privacy of others</li>
                  {/* Add any other user conduct guidelines */}
               </ul>
            </p>

            <h2 className="text-xl font-bold mt-6">Intellectual Property</h2>
            <p>
               {appName} and its content, features, and functionality are owned
               by {appName} and are protected by international copyright,
               trademark, patent, trade secret, and other intellectual property
               or proprietary rights laws.
            </p>

            {/* Add more sections as needed */}

            <h2 className="text-xl font-bold mt-6">Disclaimer</h2>
            <p>
               {appName} is provided "as is" and "as available" without any
               representations or warranties, expressed or implied. {appName}
               makes no representations or warranties in relation to the use or
               completeness of the information on the platform.
            </p>

            <h2 className="text-xl font-bold mt-6">Contact Us</h2>
            <p>
               If you have any questions or concerns about our Terms of Service,
               please feel free to reach out to us at:
               <span className="italic">sahsisunny@gmail.com</span>
            </p>

            <p className="mt-8">
               Thank you for using {appName} responsibly. Your compliance with
               these terms helps us provide a safe and enjoyable platform for
               everyone.
            </p>
         </div>
      </section>
   )
}

export function generateMetadata() {
   return {
      title: `Terms of Service - ${appName}`,
      description: `Explore the Terms of Service for ${appName}, a ${appName} clone designed with care by Sunny Sahsi.`,
   }
}
