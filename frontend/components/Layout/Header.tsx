'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-secondary-200 shadow-sm z-30">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="hidden md:block">
          <h2 className="text-lg font-semibold text-secondary-900">Welcome back</h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
            <Bell size={20} className="text-secondary-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden sm:inline text-sm font-medium text-secondary-900">
                {user?.name || 'User'}
              </span>
              <ChevronDown size={16} className="text-secondary-500" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-2">
                <div className="px-4 py-2 border-b border-secondary-200">
                  <p className="text-sm font-medium text-secondary-900">{user?.name}</p>
                  <p className="text-xs text-secondary-500">{user?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-secondary-600 hover:bg-secondary-100">
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
