import React from 'react'

function SettingsPage() {
   return (
      <section className="flex flex-col justify-center h-screen p-20">
         <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
         <div className="mb-4">
            <p>Welcome,!</p>
            {/* Display other user details as needed */}
         </div>
         <button className="bg-red-500 text-white px-4 py-2 rounded">
            Delete My Account
         </button>
      </section>
   )
}

export default SettingsPage

export function generateMetadata() {
   return {
      title: `Account - WhisperVerse`,
      description: `Account page for WhisperVerse.`,
   }
}
