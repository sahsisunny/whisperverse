import React from 'react'

interface TooltipProps {
   children: React.ReactNode
   onClick?: () => void
   text: string
}
function Tooltip({ children, onClick, text }: TooltipProps) {
   return (
      <div
         className="group relative inline-flex items-center justify-center cursor-pointer "
         onClick={onClick}
      >
         {children}
         <div className="hidden group-hover:block">
            <div className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
               <div className="rounded-lg bgr border-x-2 py-2 px-4 shadow-lg">
                  <p className="whitespace-nowrap">{text}</p>
               </div>
               <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-400"></div>
            </div>
         </div>
      </div>
   )
}

export default Tooltip
