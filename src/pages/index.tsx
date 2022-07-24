import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  const session = useSession()

  return (
    <>
      <Head>
        <title>一番🔥</title>
        <meta name="description" content="best hottest page on the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        {session.status === 'authenticated' ? (
          <>
            <h2 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
              Welcome to my lair
            </h2>
          </>
        ) : session.status === 'loading' ? null : (
          <button
            onClick={() => signIn('github')}
            className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 p-6 border-gray-50 border rounded-full shadow-md hover:border-gray-100 hover:bg-gray-50 focus:bg-gray-50 transition-colors cursor-pointer"
          >
            一番🔥
          </button>
        )}
      </main>
    </>
  )
}

export default Home
