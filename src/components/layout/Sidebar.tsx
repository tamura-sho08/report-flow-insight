
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  PlusCircle,
  Bell,
  Menu,
  ChevronLeft,
  Users,
  Settings,
  UserCog,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const navIconStyle = { minWidth: "20px" }
  const navItems = [
    { path: '/', icon: <Home size={20} style={navIconStyle} />, label: 'ダッシュボード' },
    { path: '/reports', icon: <FileText size={20} style={navIconStyle} />, label: '日報一覧' },
    { path: '/team', icon: <Users size={20} style={navIconStyle} />, label: 'チーム' },
    { path: '/notifications', icon: <Bell size={20} style={navIconStyle} />, label: 'お知らせ' },
    { path: '/user-management', icon: <UserCog size={20} style={navIconStyle} />, label: 'ユーザー管理' },
    { path: '/settings', icon: <Settings size={20} style={navIconStyle} />, label: '設定' },
  ];

  return (
    <div className={`sidebar fixed inset-y-0 left-0 z-30 bg-sidebar transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-white font-bold text-xl whitespace-nowrap">日報アプリ</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-md hover:bg-white/10"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* ユーザー情報 */}
      {user && (
        <div className={`px-4 py-3 border-b border-sidebar-border ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white whitespace-nowrap">
                <User size={16} />
              </div>
            </div>
          ) : (
            <div className="text-white whitespace-nowrap">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-white/70">{user.department}</div>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 py-6 overflow-y-auto overflow-hidden">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {!isCollapsed && <span className='whitespace-nowrap'>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 space-y-3 overflow-hidden">
        {!isCollapsed ? (
          <>
            <Link
              to="/create-report"
              className="bg-white text-sidebar w-full py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              <PlusCircle size={18} style={navIconStyle} />
              新規日報作成
            </Link>

            <Button
              variant="outline"
              className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white overflow-hidden"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" style={navIconStyle} />
              ログアウト
            </Button>
          </>
        ) : (
          <>
            <Link
              to="/create-report"
              className="bg-white text-sidebar w-full h-10 rounded-md flex items-center justify-center hover:bg-white/90 transition-colors"
            >
              <PlusCircle size={20} />
            </Link>

            <Button
              variant="outline"
              className="w-full h-10 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white overflow-hidden"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
