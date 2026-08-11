import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, LogOut, Package } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass-panel border-b-0 border-b-white/50 shadow-sm" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-800 tracking-tight">NETUTECH</span>
            </div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider hidden sm:block">Product Hub</p>
          </div>
        </div>

        {/* User Info & Actions */}
        {user && (
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Role Badge */}
            <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-2xl border border-white/60 shadow-sm">
              {user.role === 'Admin' ? (
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
              ) : (
                <User className="w-4 h-4 text-violet-500" />
              )}
              <div className="text-xs">
                <span className="font-semibold text-slate-800 hidden sm:inline">{user.name}</span>
                <span className="font-semibold text-slate-800 sm:hidden">{user.name.split(' ')[0]}</span>
                <span
                  className={`ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    user.role === 'Admin'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-violet-100 text-violet-600'
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-rose-500 bg-white/40 hover:bg-white/80 px-4 py-2.5 rounded-2xl border border-slate-200/50 transition-all shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
