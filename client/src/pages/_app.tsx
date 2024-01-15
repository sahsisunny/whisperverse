import '@/styles/globals.css'

import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'

interface MyAppProps {
   Component: React.FC<AppProps>
   pageProps: AppProps
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
   const rtkStore = store()
   return (
      <Provider store={rtkStore}>
         <Component {...pageProps} />
      </Provider>
   )
}
