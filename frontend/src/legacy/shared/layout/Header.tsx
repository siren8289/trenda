import React from 'react';
import { Button } from '../../ui/button';
import { User, LogOut, Search, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu"
import { cn } from "../../ui/utils"

interface HeaderProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  isAdmin?: boolean;
}

export function Header({ onNavigate, isLoggedIn, onLogout, isAdmin }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-8 max-w-[1920px] mx-auto">
        {/* Left Side: Logo + Navigation */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-[#1CB0F6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-[#1CB0F6]">
              Trenda
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('play')} 
              className="text-base font-medium hover:text-[#1CB0F6] hover:bg-transparent transition-colors px-3"
            >
              Play
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('build')} 
              className="text-base font-medium hover:text-[#1CB0F6] hover:bg-transparent transition-colors px-3"
            >
              Build
            </Button>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-base font-medium bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent hover:text-[#1CB0F6] focus:text-[#1CB0F6] data-[active]:text-[#1CB0F6] data-[state=open]:text-[#1CB0F6] px-3 h-10 transition-colors shadow-none border-none group"
                  >
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-[240px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none rounded-lg py-3 px-4 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-[#1CB0F6] focus:bg-slate-50 cursor-pointer text-slate-900"
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate('trend-research');
                            }}
                            href="#"
                          >
                            <div className="text-[15px] font-medium leading-none">Trend Research</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none rounded-lg py-3 px-4 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-[#1CB0F6] focus:bg-slate-50 cursor-pointer text-slate-900"
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate('project-archive');
                            }}
                            href="#"
                          >
                            <div className="text-[15px] font-medium leading-none">Project Archive</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none rounded-lg py-3 px-4 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-[#1CB0F6] focus:bg-slate-50 cursor-pointer text-slate-900"
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate('resources');
                            }}
                            href="#"
                          >
                            <div className="text-[15px] font-medium leading-none">Resources</div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="hover:text-[#1CB0F6] hover:bg-transparent transition-colors"
          >
            <Search className="w-6 h-6" strokeWidth={2} />
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={() => onNavigate('admin-dashboard')}>
                  Admin
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="hover:text-[#1CB0F6] hover:bg-transparent transition-colors"
                  >
                    <User className="w-6 h-6" strokeWidth={2} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('mypage')} className="cursor-pointer gap-2 p-3 rounded-lg">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('settings')} className="cursor-pointer gap-2 p-3 rounded-lg">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer gap-2 p-3 rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => onNavigate('login')} className="hover:text-[#1CB0F6] hover:bg-transparent">
                Log in
              </Button>
              <Button 
                className="bg-[#1CB0F6] text-white hover:bg-[#0D8FCC]"
                onClick={() => onNavigate('signup')}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
