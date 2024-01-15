import React from 'react'

import Layout from '@/components/Layout'

function Loader() {
   return (
      <Layout title="Loading...">
         <div className="flex justify-center items-center min-h-[82vh]">
            <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-purple-500"></div>
            <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-red-500 ml-3"></div>
            <div className="animate-spin ease-linear rounded-full w-20 h-20 border-t-2 border-b-2 border-yellow-500 ml-3"></div>
         </div>
      </Layout>
   )
}

export default Loader
