"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wallet, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import React from 'react';

// Mock user for demonstration
const mockUser = {
    displayName: "Mock User",
    email: "mock@example.com",
    photoURL: ""
}

export function Header() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = React.useState<any>(mockUser);
  const [loading, setLoading] = React.useState(false);


  const handleLogout = async () => {
    setLoading(true);
    try {
      // Mock logout
      setUser(null);
      router.push('/login');
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    } finally {
        setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <header className="flex items-center justify-between p-4 bg-card border-b sticky top-0 z-10 md:p-2 md:pl-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b sticky top-0 z-10 md:p-2 md:pl-4">
       <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-3 md:hidden">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-headline">TrackWise</h1>
        </Link>
      </div>
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || ''} />
                  <AvatarFallback>
                      <UserCircle className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
