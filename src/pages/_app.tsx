import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Layout from '@/layout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // import bootstrap js
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
