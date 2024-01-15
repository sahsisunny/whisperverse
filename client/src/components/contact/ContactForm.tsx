import React, { useState } from 'react'

function ContactForm() {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   })

   const handleChange = (e: any) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   const handleSubmit = async (e: any) => {
      // e.preventDefault()
      // await addContactUs(formData)
   }
   return (
      <form onSubmit={handleSubmit}>
         <div className="mb-4">
            <label
               htmlFor="name"
               className="block text-sm font-medium text-gray-600"
            >
               Name
            </label>
            <input
               type="text"
               id="name"
               name="name"
               value={formData.name}
               onChange={handleChange}
               required
               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
         </div>

         <div className="mb-4">
            <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-600"
            >
               Email
            </label>
            <input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               required
               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
         </div>

         <div className="mb-4">
            <label
               htmlFor="message"
               className="block text-sm font-medium text-gray-600"
            >
               Message
            </label>
            <textarea
               id="message"
               name="message"
               rows={4}
               value={formData.message}
               onChange={handleChange}
               required
               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
         </div>

         <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
         >
            Submit
         </button>
      </form>
   )
}

export default ContactForm
