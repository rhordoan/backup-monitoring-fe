"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitFork,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Server,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  count?: number; // `count` is optional, so we use `?`
}

const NavItem = ({ href, icon: Icon, children, count }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`
      flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
      ${isActive
        ? 'bg-[#16275d] text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-200'
      }
    `}>
      <div className="flex items-center">
        <Icon size={20} className="mr-3" />
        <span>{children}</span>
      </div>
      {count && (
        <span className={`
          px-2 py-0.5 text-xs rounded-full
          ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}
        `}>
          {count}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
    // Updated navItems: 'Settings' has been removed and 'Reports' now has a functional href.
    const navItems = [
        { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/clusters', icon: Server, label: 'Clusters', count: 12 },
        { href: '/workflows', icon: GitFork, label: 'Workflows', count: 247 },
        { href: '/alerts', icon: AlertTriangle, label: 'Alerts', count: 3 },
        { href: '/reports', icon: BarChart3, label: 'Reports' }, // href changed to a working route
    ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="bg-gradient-to-br from-[#16275d] to-[#2b4ab6] p-2 rounded-lg">
           <ShieldCheck size={24} className="text-white" />
        </div>
        <div>
           <h1 className="text-lg font-bold text-gray-800">BackupAI</h1>
           <p className="text-xs text-gray-500">Infrastructure Monitor</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">Navigation</h2>
          {navItems.map((item) => (
            <NavItem key={item.label} href={item.href} icon={item.icon} count={item.count}>
                {item.label}
            </NavItem>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                <h3 className="text-sm font-semibold text-gray-800">System Status</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">All systems operational</p>
            <div className="flex items-center text-xs text-green-600">
                <TrendingUp size={14} className="mr-1"/>
                <span>99.9% uptime</span>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
