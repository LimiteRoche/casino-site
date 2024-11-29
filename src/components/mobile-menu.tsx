// src/components/MobileMenu.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden text-white">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
        <nav className="flex flex-col space-y-4 mt-8">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="flex items-center space-x-2 hover:text-yellow-400">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}