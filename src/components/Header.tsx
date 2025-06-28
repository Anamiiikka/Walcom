import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, LogOut, Package, Zap, ClipboardList } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, signOut } = useAuth();
  const { itemCount, totalAmount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2.5 rounded-lg">
              <span className="font-bold text-xl">W</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-600">Walmart</span>
              <div className="text-xs text-gray-600 -mt-1">Save money. Live better.</div>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search everything at Walmart online and in store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-24 border-2 border-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                    <User className="h-5 w-5" />
                    <div className="hidden md:block text-left">
                      <div className="text-xs text-gray-500">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'User'}</div>
                      <div className="text-sm font-semibold">Account</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/my-orders')} className="cursor-pointer">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                <User className="h-5 w-5" />
                <div className="hidden md:block">
                  <div className="text-xs text-gray-500">Sign in</div>
                  <div className="text-sm font-semibold">Account</div>
                </div>
              </Link>
            )}

            <Link to="/cart" className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <div className="hidden md:block">
                <div className="text-xs text-gray-500">Cart</div>
                <div className="text-sm font-semibold">
                  {formatPrice(totalAmount)}
                </div>
              </div>
            </Link>

            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-20 border-2 border-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t bg-blue-600 -mx-4 px-4">
          <Link to="/products" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
            <Package className="w-4 h-4" />
            All Departments
          </Link>
          <Link to="/products?category=Electronics" className="text-white hover:text-yellow-300 font-medium">
            Electronics
          </Link>
          <Link to="/products?category=Fashion" className="text-white hover:text-yellow-300 font-medium">
            Clothing
          </Link>
          <Link to="/products?category=Home & Kitchen" className="text-white hover:text-yellow-300 font-medium">
            Home
          </Link>
          <Link to="/products?category=Groceries" className="text-white hover:text-yellow-300 font-medium">
            Grocery
          </Link>
          <div className="flex items-center gap-1 text-yellow-300 font-medium">
            <Zap className="w-4 h-4" />
            <span>Rollbacks & more</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;