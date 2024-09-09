import { Login } from '@/Firebase/functions'
import { Button } from '../ui/button'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Menu from './Menu'

const Navbar = () => {

  const [authenticated, setAuthenticated] = useState(false)

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true)
      }
      if(!user) {
        setAuthenticated(false)
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <nav className='flex bg-white justify-between items-center p-2 shadow-xl border-b-[1px] border-b-secondary w-screen'>
        <a href={authenticated ? `/trips`: `/`}><img className='h-[40px] sm:h-[60px] cursor-pointer' src="/logo.png" alt="logo-img"/></a>
        {authenticated ? (
            <Menu/>
          ) : (
            <Button onClick={Login} className="bg-primary text-white font-bold hover:bg-primary/80">Get started</Button>
        )}
    </nav>
  )
}

export default Navbar