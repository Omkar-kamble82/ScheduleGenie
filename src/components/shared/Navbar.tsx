import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <nav className='flex bg-white justify-between items-center p-2 shadow-lg absolute w-screen'>
        <img className='h-[40px] sm:h-[60px] cursor-pointer' src="/logo.png" alt="logo-img"/>
        <Button className="bg-primary text-white font-bold hover:bg-primary/80">Get started</Button>
    </nav>
  )
}

export default Navbar