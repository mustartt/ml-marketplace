import React from 'react';
import { ArchiveIcon, CubeTransparentIcon, DatabaseIcon } from '@heroicons/react/outline';

interface CategoryIconProps {
  category: string;
  className?: string;
}

const CLASSNAME = 'w-6 h-6';

const getProductIcon = (category: string) => {
  switch (category) {
    case 'model':
      return CubeTransparentIcon;
    case 'product':
      return DatabaseIcon;
    default:
      return ArchiveIcon;
  }
};

const CategoryIcon: React.FC<CategoryIconProps> = ({category, className}) => {
  const Icon = getProductIcon(category);
  return <Icon className={className || CLASSNAME}/>;
};

export default CategoryIcon;