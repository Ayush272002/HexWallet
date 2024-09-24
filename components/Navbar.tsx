import { Wallet } from 'lucide-react';
import ThemeButton from './ThemeButton';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Wallet className="size-8" />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-bold text-primary flex gap-2 items-center">
            HexWallet{' '}
          </span>
        </div>
      </div>
      <ThemeButton />
    </nav>
  );
};

export default Navbar;
