import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logout } from "@/Firebase/functions"
import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/40 hover:text-primary h-10 sm:h-12 px-4 py-2 text-white">Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
            <Link to="/trip/generate"><DropdownMenuItem className="font-semibold text-secondary">Generate Itinerary</DropdownMenuItem></Link>
            <DropdownMenuSeparator />
            <Link to="/trips"><DropdownMenuItem className="font-semibold text-secondary">My Trips</DropdownMenuItem></Link>
            <DropdownMenuItem onClick={() => Logout()} className="text-rose-400 font-semibold">Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu;