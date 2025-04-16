
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isMobile={isMobile} />
      
      <div className={`transition-all duration-300 ${isMobile ? 'ml-16' : 'ml-64'}`}>
        <main className="container py-6 px-4 md:px-6">
          <Outlet />
        </main>
      </div>
      
      {/* Floating Action Button for mobile */}
      <div className="fixed right-6 bottom-6 md:hidden">
        <Link to="/create-report">
          <Button className="h-14 w-14 rounded-full shadow-lg" size="icon">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainLayout;
