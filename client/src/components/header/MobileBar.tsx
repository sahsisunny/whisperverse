'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IconType } from 'react-icons'
import { BiHomeAlt, BiSolidHome } from 'react-icons/bi'
import {
   IoSettings,
   IoSettingsOutline,
   IoShapesOutline,
   IoShapesSharp,
} from 'react-icons/io5'
import { TfiLayoutListThumb, TfiLayoutListThumbAlt } from 'react-icons/tfi'

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
      label: 'Links',
      icon: TfiLayoutListThumb,
      href: '/links',
      activeIcon: TfiLayoutListThumbAlt,
   },
   {
      label: 'Appearance',
      icon: IoShapesOutline,
      href: '/appearance',
      activeIcon: IoShapesSharp,
   },

   {
      label: 'Settings',
      icon: IoSettingsOutline,
      href: '/settings',
      activeIcon: IoSettings,
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
