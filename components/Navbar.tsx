import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'


const Navbar = async () => {
  const session = await auth();

  
  return (
    <header className='px-5 py-3 bg-black shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        </Link>
        <div className='flex items-center gap-5 text-white'>
          {session && session?.user ? (
            <>
              <Link href={'/lore/create'}>
                <span>Create</span>
              </Link>
              <form action={async() => {
                "use server";

                await signOut()
              }}>
                <button type='submit'>Logout</button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={ async() => {
              "use server";

              await signIn('github')
              }}>
              
              <button type='submit'>
                Login
              </button>

            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;