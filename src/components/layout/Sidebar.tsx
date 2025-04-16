
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  PlusCircle, 
  Bell, 
  Menu, 
  ChevronLeft, 
  Users, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'ダッシュボード' },
    { path: '/reports', icon: <FileText size={20} />, label: '日報一覧' },
    { path: '/team', icon: <Users size={20} />, label: 'チーム' },
    { path: '/notifications', icon: <Bell size={20} />, label: 'お知らせ' },
    { path: '/settings', icon: <Settings size={20} />, label: '設定' },
  ];
  
  return (
    <div className={`sidebar fixed inset-y-0 left-0 z-30 bg-sidebar transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-white font-bold text-xl">日報アプリ</h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className="text-white p-2 rounded-md hover:bg-white/10"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4">
        {!isCollapsed ? (
          <Link
            to="/create-report"
            className="bg-white text-sidebar w-full py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
          >
            <PlusCircle size={18} />
            新規日報作成
          </Link>
        ) : (
          <Link
            to="/create-report"
            className="bg-white text-sidebar w-full h-10 rounded-md flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <PlusCircle size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
