import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const Icon = category.icon;

  const handleClick = () => {
    if (category.id === 'placements') {
      window.open('https://www.codingninjas.com/review', '_blank');
    } else if (category.id === 'requests') {
      window.open('https://forms.gle/YjomLse5URdYNHDe9', '_blank');
    } else {
      navigate(`/section/${category.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-xl p-3 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center h-[140px] xs:h-[160px] sm:h-[240px]"
    >
      <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 rounded-full bg-[#fff7ed] flex items-center justify-center mb-2 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 text-[#f68d1e] stroke-[1.5]" />
      </div>
      
      <h3 className="text-[#414141] text-xs xs:text-sm sm:text-lg font-semibold sm:font-medium leading-tight sm:leading-snug px-1 sm:px-2">
        {category.title}
      </h3>
    </div>
  );
};

export default CategoryCard;