import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';

interface UserMenuProps {
  userName: string;
  userDNI: string;
}

export function UserMenu({ userName, userDNI }: UserMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50"
      >
        <div className="text-right leading-tight">
          <div className="text-sm font-medium">{userName}</div>
          <div className="text-[11px] text-gray-500">{userDNI}</div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="text-xs font-medium text-white">
            {userName.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
          <Link
            to="/usuari"
            onClick={() => setShowMenu(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            Perfil d'usuari
          </Link>
          <Link
            to="/"
            onClick={() => setShowMenu(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
          >
            Tancar sessió
          </Link>
        </div>
      )}
    </div>
  );
}
