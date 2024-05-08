import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { LayoutPage } from '@/common/components/Layout/LayoutPage'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutPage>
      <Component {...pageProps} />
    </LayoutPage>
  )
}
