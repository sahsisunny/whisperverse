import React from 'react'

interface WaitBannerProps {
   isLoading: boolean
   isError?: boolean
}

const WaitBanner: React.FC<WaitBannerProps> = ({ isLoading, isError }) => {
   const bannerStyle = {
      opacity: isLoading || isError ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
   }

   return (
      <div
         className="relative top-0 w-full text-white p-4 flex items-center justify-center"
         style={bannerStyle}
      >
         <div className="mr-2">
            {isError ? (
               <span role="img" aria-label="Error" className="text-red-500">
                  ❌
               </span>
            ) : (
               <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
            )}
         </div>
         <p className="text-lg font-semibold">
            {isError
               ? 'Oops! Something went wrong. '
               : 'Hang tight! Our services are starting up...'}
         </p>
      </div>
   )
}

export default WaitBanner
