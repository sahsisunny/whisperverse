import React, { useState } from 'react'

interface ButtonProps {
   onClick: () => void
   isLoading?: boolean
   className?: string
   children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
   onClick,
   isLoading = false,
   children,
   className,
}) => {
   const [isClicked, setIsClicked] = useState(false)

   const handleClick = () => {
      setIsClicked(true)
      onClick()
   }

   return (
      <button
         onClick={handleClick}
         className={
            className ??
            `flex justify-center items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded relative ${
               isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`
         }
         disabled={isLoading}
      >
         {children}
         {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            </div>
         )}
      </button>
   )
}

export default Button
