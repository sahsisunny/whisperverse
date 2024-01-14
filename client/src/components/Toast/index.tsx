import { ToastType } from '@/types/Toast'
import { FC, useEffect } from 'react'
import { MdDone, MdError, MdInfo } from 'react-icons/md'

const typeClassMap = {
   success: 'bg-green-500 text-white',
   error: 'bg-red-500 text-white',
   default: 'bg-blue-500 text-white',
}

const iconMap: Record<string, React.ReactElement> = {
   success: <MdDone size={24} />,
   error: <MdError size={24} />,
   default: <MdInfo size={24} />,
}

const Toast: FC<ToastType> = ({
   message,
   isVisible,
   timeToShow,
   onDismiss,
   type,
}) => {
   useEffect(() => {
      if (isVisible) {
         const timer = setTimeout(() => {
            onDismiss()
         }, timeToShow)

         return () => clearTimeout(timer)
      }
   }, [isVisible, timeToShow, onDismiss])

   const toastType = type as keyof typeof typeClassMap
   const icon = iconMap[toastType] || iconMap.default
   const toastClasses = typeClassMap[toastType] || typeClassMap.default

   return (
      <div
         className={`fixed top-[15%] right-4 p-4 rounded-md shadow-md z-50 ${
            isVisible ? 'visible' : 'invisible'
         } ${toastClasses}`}
      >
         <div className="flex items-center justify-center">
            {icon}
            <p className="ml-2" data-testid="toast">
               {message}
            </p>
         </div>
      </div>
   )
}

export default Toast
