import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'
import Image from 'next/image'
import MobileNav from './MobileNav'
//import { HomeIcon } from '@heroicons/react/solid' // Importing HomeIcon
import { Home } from 'lucide-react' // Importing Home icon from Lucide React


const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex justify-between h-16 items-center'>

              {/* Mobile Navigation Button */}
              <MobileNav />

              {/* Image visible on large screens, hidden on small screens */}
              <div className='hidden lg:flex ml-4'>
                <Link href='/'>
                  <Image
                    src='/logoNav.png'
                    alt='logo de um panda'
                    className='h-12 w-12'
                    width={100}
                    height={100}
                  />
                </Link>
              </div>

              {/* Icon visible on small screens, hidden on large screens */}
              <div className='lg:hidden ml-4 flex'>
                <Link href='/'>
                  <Home className='h-6 w-6 text-gray-500 hover:text-blue-500' />
                </Link>
              </div>

              {/* Hide these elements on smaller screens */}
              <div className='hidden lg:flex lg:ml-8 lg:self-stretch'>
                <NavItems />
              </div>

              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-start lg:space-x-6'>
                <div className='ml-auto flex items-center'>
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <>
                      <Link href='/sign-in' className={buttonVariants({ variant: 'ghost' })}>Sign in</Link>
                      <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                      <Link href='/sign-up' className={buttonVariants({ variant: 'ghost' })}>Create account</Link>
                    </>
                  )}
                </div>
              </div>

              {/* Cart always visible on the right */}
              <div className='mr-8 lg:ml-8 '>
                <Cart />
              </div>

            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar;
