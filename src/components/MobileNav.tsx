'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/config';
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()

  // Handle clicks outside of the mobile navigation
  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // Close nav on large screens or on specific conditions
  const handleResize = () => {
    if (window.innerWidth >= 1024) {  // Adjust this value based on your design
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCategory = (label: string) => {
    if (expandedCategory === label) {
      setExpandedCategory(null); // Collapse if it's already expanded
    } else {
      setExpandedCategory(label); // Expand new category
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-40 flex lg:hidden'>
          <div className='fixed inset-0 bg-black bg-opacity-25' onClick={() => setIsOpen(false)}></div>
          <div className='relative w-4/5 max-w-sm overflow-y-auto bg-white shadow-xl' ref={navRef}>
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>

            {/* Navigation content here */}
            {/* Example content with categories and links */}
            <div className='mt-2'>
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category.label} className='px-4 pb-4 pt-8'>
                    <div className='border-b border-gray-200'>
                      <button onClick={() => toggleCategory(category.label)} className='flex justify-between items-center w-full py-4 text-left text-base font-medium'>
                        {category.label}
                        {expandedCategory === category.label ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                    {expandedCategory === category.label && (
                      <div className='grid mt-8 grid-cols-1 gap-y-10 gap-x-4'>
                        {category.featured.map((item) => (
                          <div key={item.name} className='group relative text-sm'>
                            <Link href={item.href} className='mt-3 block font-medium text-gray-900 hover:text-blue-500'>
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className='px-4 pb-4 pt-4'>
              <div className='border-b border-gray-200'>
                <div className='flow-root'>

                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    href='/sign-in'
                    className='-m-2 block  mt-8 mb-3 p-2 font-medium text-gray-900 '>
                    Sign in
                  </Link>
                </div>
              </div>

              <div className='border-b  border-gray-200'>
                <div className='flow-root '>
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    href='/sign-up'
                    className='-m-2 block mt-8 mb-3 p-2 font-medium text-gray-900'>
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
