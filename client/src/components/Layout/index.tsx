import Head from 'next/head'
import { FC, ReactNode } from 'react'
import MobileBar from '../header/MobileBar'
import Header from '../header'
import Footer from '../footer'

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
               content="Shorten and share URLs with rds.li, a simple and efficient URL shortener."
            />
            <meta
               name="keywords"
               content="URL shortener, rds.li, link shortener, short URLs"
            />
            <meta name="author" content="Real Dev Squad" />
            <meta property="og:title" content="rds.li - URL Shortener" />
            <meta
               property="og:description"
               content="Shorten and share URLs with rds.li, a simple and efficient URL shortener."
            />
            <meta
               property="og:url"
               content="https://staging-tinysite.realdevsquad.com/"
            />
            <meta property="og:type" content="website" />
         </Head>
         <Header />
         <main>{children}</main>
         <Footer />
         <MobileBar />
      </>
   )
}

export default Layout
