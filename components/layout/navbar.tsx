'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  if (pathname === '/login' || pathname === '/register') return null;

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/events" className="flex items-center space-x-2 text-xl font-bold text-primary">
              <Calendar className="h-6 w-6" />
              <span>GoOut</span>
            </Link>

            {isLoggedIn && (
              <>
                <Link href="/locations">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Locations
                  </Button>
                </Link>

                <Link href="/events">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Events
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
