import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { ConnectKitButton } from 'connectkit';
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-800 text-white">
      <Link href="/" className="text-2xl font-bold">
        Puzzle Social
      </Link>
      {/* <Button variant="outline" className="text-white border-white hover:bg-indigo-700">
        Connect Wallet
      </Button> */}
      <ConnectKitButton 
        mode='light'
      />
    </nav>
  )
}

export default Navbar

