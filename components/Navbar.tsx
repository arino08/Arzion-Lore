import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut, signIn } from '@/auth';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='px-5 py-3 bg-black shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        </Link>
        <div className="flex items-center gap-5 text-white">
        
        

          {session && session?.user ? (
            <>
            <AnimatedBackground 
        className=' rounded-lg bg-zinc-800' 
        transition={{
          type: 'spring',
          bounce: 0.5,
          duration: 0.3,
        }}
        enableHover>
              <Link 
              href={'/lore/create'}
              >
                <span className='max-sm:hidden px-2 py-0.5 text-zinc-400 transition-colors duration-300  hover:text-zinc-50'>Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({redirectTo: '/'});
                }}
                data-id='logout'
                
              >
                <button type='submit' className='max-sm:hidden'>
                  <span 
                  className="max-sm:hidden px-2 py-0.5 text-zinc-400 transition-colors duration-300   hover:text-zinc-50"
                  >Logout</span>
                <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              </AnimatedBackground>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10 ">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <AnimatedBackground 
        className=' rounded-lg bg-zinc-800' 
        transition={{
          type: 'spring',
          bounce: 0.5,
          duration: 0.3,
        }}
        enableHover>
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
              data-id='login'
              className='nav-item px-2 py-0.5 text-zinc-400 transition-colors duration-300   hover:text-zinc-50'
            >
              <button type='submit'>Login with GitHub</button>
            </form>
            <form
                action={async () => {
                  'use server';
                  await signIn('google');
                }}
                data-id='login-google'
                className='nav-item px-2 py-0.5 text-zinc-400 transition-colors duration-300 hover:text-zinc-50'
              >
                <button type='submit'>Login with Google</button>
              </form>
            </AnimatedBackground>
          )}
          
        
        </div>
      </nav>
    </header>
  );
};

export default Navbar;