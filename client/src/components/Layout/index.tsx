import Head from 'next/head'
import { FC, ReactNode } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import MobileBar from '@/components/header/MobileBar'

type LayoutProps = {
   title: string
   children: ReactNode
}

const Layout: FC<LayoutProps> = ({ title, children }) => {
   return (
      <>
         <Head>
            <title>{title}</title>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            <meta
               name="description"
               content="Whisperverse is a dynamic web application that allows users to share and explore anonymous secrets. The application is built with a Full Stack approach, utilizing technologies such as Next.js, Express, Node.js, MongoDB, and various other tools to provide a seamless and secure experience."
            />
         </Head>
         <Header />
         <main>{children}</main>
         <Footer />
         <MobileBar />
      </>
   )
}

export default Layout
