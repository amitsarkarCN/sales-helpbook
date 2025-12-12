import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, LogIn, ArrowLeft, Home } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            {showBack && !isAdminPage && (
              <button 
                onClick={() => navigate('/')}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-[#f68d1e] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#e07b10] transition-colors">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-[#414141] leading-tight">Sales Helpbook</h1>
                <span className="text-xs text-gray-500 font-medium">Coding Ninjas Internal Resource</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {isAdminPage ? (
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#414141] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Website
              </button>
            ) : (
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#414141] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;