import React from 'react'

import Layout from '@/components/Layout'

function SettingsPage() {
   return (
      <Layout title="Account - WhisperVerse">
         <section className="flex flex-col justify-center h-screen p-20">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <div className="mb-4">
               <p>Welcome,!</p>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
               Delete My Account
            </button>
         </section>
      </Layout>
   )
}

export default SettingsPage
