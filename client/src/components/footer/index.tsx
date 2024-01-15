import Link from 'next/link'
import React from 'react'

function Footer() {
   return (
      <footer className="py-4 w-full md:bg-white  rounded-t-[35px] md:text-black h-[8vh]">
         <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center">
            <div>
               <p className="text-sm ">
                  &copy; {new Date().getFullYear()} Whisper Verse
               </p>
            </div>
            <nav className="flex gap-4 text-sm ">
               <Link href="/privacy">Privacy Policy</Link>
               <Link href="/terms">Terms of Service</Link>
               <Link href="/contact">Contact Us</Link>
            </nav>
         </div>
      </footer>
   )
}

export default Footer
