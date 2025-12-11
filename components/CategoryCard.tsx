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
      className="group bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center h-[240px]"
    >
      <div className="w-20 h-20 rounded-full bg-[#fff7ed] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-9 h-9 text-[#f68d1e] stroke-[1.5]" />
      </div>
      
      <h3 className="text-[#414141] text-lg font-medium leading-snug px-2">
        {category.title}
      </h3>
    </div>
  );
};

export default CategoryCard;