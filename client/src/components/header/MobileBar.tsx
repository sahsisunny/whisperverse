import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IconType } from 'react-icons'
import { BiHomeAlt, BiSolidHome } from 'react-icons/bi'

import { FaUserCircle, FaRegUserCircle } from 'react-icons/fa'
import { FaUserSecret } from 'react-icons/fa6'
import { LiaUserSecretSolid } from 'react-icons/lia'

interface TabConfig {
   label: string
   icon: IconType
   activeIcon: IconType
   href: string
}

const tabs: TabConfig[] = [
   {
      label: 'Home',
      icon: BiHomeAlt,
      href: '/',
      activeIcon: BiSolidHome,
   },
   {
      label: 'My Secret',
      icon: LiaUserSecretSolid,
      href: '/secret',
      activeIcon: FaUserSecret,
   },

   {
      label: 'Profile',
      icon: FaRegUserCircle,
      href: '/profile',
      activeIcon: FaUserCircle,
   },
]

interface MobileTabProps {
   label: string
   icon: IconType
   isActive: boolean
   href: string
   onClick?: () => void
}

const MobileTab: React.FC<MobileTabProps> = ({
   label,
   icon: Icon,
   href,
   onClick,
   isActive,
}) => {
   return (
      <div className="w-1/4 flex justify-center items-center">
         <Link
            className="flex flex-col items-center"
            href={href}
            onClick={onClick}
         >
            {isActive ? (
               <Icon className="text-2xl text-center" />
            ) : (
               <Icon className="text-2xl text-center" />
            )}
            <p className="text-center text-sm">{label}</p>
         </Link>
      </div>
   )
}

const MobileBar = () => {
   const activeTab = usePathname()

   return (
      <div className="w-screen h-16 flex justify-between items-center  text-black md:hidden bg-white py-2 rounded-t-[35px] sticky bottom-0 left-0">
         {tabs.map((tab, index) => (
            <MobileTab
               key={index}
               label={tab.label}
               isActive={activeTab == tab.href}
               icon={activeTab === tab.href ? tab.activeIcon : tab.icon}
               href={tab.href}
            />
         ))}
      </div>
   )
}

export default MobileBar
