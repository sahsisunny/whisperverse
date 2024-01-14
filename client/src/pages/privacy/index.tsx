import { FaEnvelope, FaImage, FaLink, FaUser } from 'react-icons/fa'
import Layout from '@/components/Layout'

const appName = 'WhisperVerse'

export default function Privacy() {
   return (
      <Layout title="Privacy Policy - WhisperVerse">
         <section className="flex flex-col justify-center sm:p-20 p-6 py-16 my-auto">
            <div className="mx-auto flex flex-col gap-6 p-6 shadow text-black bg-white rounded-[20px]">
               <h1 className="text-3xl font-bold mb-4 text-center underline">
                  Privacy Policy for {appName}
               </h1>

               <p>
                  Welcome to {appName}! We value your trust, and we want to be
                  transparent about how we collect, use, and protect your
                  personal information. Please take a moment to review our
                  privacy practices below.
               </p>

               {/* Add more sections based on your data collection and usage */}

               <h2 className="text-xl font-bold mt-6">
                  Information We Collect
               </h2>
               <p>
                  At {appName}, we collect the following types of information to
                  enhance your experience:
                  <ul className="">
                     <li>
                        <FaEnvelope className="inline-block mr-2" /> Email
                        address
                     </li>
                     <li>
                        <FaUser className="inline-block mr-2" /> Full name
                     </li>
                     <li>
                        <FaImage className="inline-block mr-2" /> Profile image
                     </li>
                     <li>
                        <FaLink className="inline-block mr-2" /> Links added via
                        Google sign-in
                     </li>
                     {/* Add any additional information you collect */}
                  </ul>
               </p>

               <h2 className="text-xl font-bold mt-6">
                  How We Use Your Information
               </h2>
               <p>
                  We use the collected information for various purposes,
                  including but not limited to:
                  <ul className="list-disc list-inside">
                     <li>
                        Providing you with a personalized and seamless user
                        experience
                     </li>
                     <li>Managing and securing your user account</li>
                     <li>Enhancing and optimizing our services</li>
                     {/* Add any other purposes */}
                  </ul>
               </p>

               {/* Add more sections as needed */}

               <h2 className="text-xl font-bold mt-6">Your Choices</h2>
               <p>
                  Your privacy matters to us. You have the right to:
                  <ul className="list-disc list-inside">
                     <li>
                        Access, update, or delete your personal information
                     </li>
                     <li>Opt-out of specific data collection practices</li>
                     {/* Add any other choices */}
                  </ul>
               </p>

               <h2 className="text-xl font-bold mt-6">Contact Us</h2>
               <p>
                  If you have any questions or concerns about our Privacy
                  Policy, please feel free to reach out to us at:
                  <span className="italic">sahsisunny@gmail.com</span>
               </p>

               <p className="mt-8">
                  Thank you for trusting {appName}. Your privacy is our
                  priority, and we are committed to ensuring your online
                  experience is secure and enjoyable.
               </p>
            </div>
         </section>
      </Layout>
   )
}
