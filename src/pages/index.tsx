import Jumbotron from '@/components/jumbotron'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>baby stats</title>
        <meta name="description" content="baby stats app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Jumbotron />
      </main>
    </>
  )
}
