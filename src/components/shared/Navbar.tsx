import { Login, Logout } from '@/Firebase/functions'
import { Button } from '../ui/button'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

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
            <Button onClick={Logout} className="text-primary border-primary border-[2px] font-bold bg-white hover:bg-primary hover:text-white">Logout</Button>
          ) : (
            <Button onClick={Login} className="bg-primary text-white font-bold hover:bg-primary/80">Get started</Button>
        )}
    </nav>
  )
}

export default Navbar