import React from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES } from '../constants';
import { useData } from '../context/DataContext';

const Dashboard: React.FC = () => {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f68d1e]"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading Helpbook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#414141] mb-2 sm:mb-3">
            Welcome to Sales Helpbook
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            Your one-stop resource for all sales-related information
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;