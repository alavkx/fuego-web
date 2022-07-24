import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { Popover, Transition } from '@headlessui/react'
import { DropdownMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Fragment } from 'react'

interface NavigationItem {
  name: string
  href: string
}
const navigation: NavigationItem[] = []

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  const session = useSession()
  console.log(session)

  return (
    <>
      <Head>
        <title>一番🔥</title>
        <meta name="description" content="best hottest page on the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-slate-50">
        {session.status === 'authenticated' ? (
          <>
            <Popover as="header" className="relative">
              <div className="bg-slate-50">
                <nav
                  className="relative max-w-7xl mx-auto flex items-center justify-between pt-6 px-6 xl:px-8"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full lg:w-auto">
                      <a href="#">
                        <span className="sr-only">Workflow</span>
                        <img className="h-8 w-auto sm:h-10" src="/favicon.ico" alt="fuego" />
                      </a>
                      <div className="-mr-2 flex items-center lg:hidden">
                        <Popover.Button className="bg-slate-50 rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-slate-500">
                          <span className="sr-only">Open main menu</span>
                          <DropdownMenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="hidden space-x-10 lg:flex lg:ml-10">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-slate-500 hover:text-slate-900"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:space-x-6">
                    {session.data.user?.image ? (
                      <img
                        className="h-8 w-auto sm:h-10 rounded-full ring-2 ring-white"
                        src={session.data.user?.image}
                        alt="Your github avatar"
                      />
                    ) : null}
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top lg:hidden"
                >
                  <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img className="h-8 w-auto" src="favicon.ico" alt="fuego" />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                          <span className="sr-only">Close menu</span>
                          <Cross1Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="pt-5 pb-6">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 px-5">
                        <a
                          href="#"
                          className="block text-center w-full py-2 px-4 border border-transparent rounded-md shadow bg-slate-500 text-white font-medium hover:bg-slate-600"
                        >
                          Login
                        </a>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
              <h2 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-slate-700">
                poggers
              </h2>
            </main>
          </>
        ) : session.status === 'loading' ? null : (
          <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
            <button
              onClick={() => signIn('github')}
              className="text-5xl md:text-[5rem] leading-normal font-extrabold text-slate-700 p-6 border-slate-50 border rounded-full shadow-md hover:border-slate-100 hover:bg-slate-50 focus:bg-gray-50 transition-colors cursor-pointer"
            >
              一番🔥
            </button>
          </main>
        )}
      </div>
    </>
  )
}

export default Home
