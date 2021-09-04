import React from 'react';
import { ArchiveIcon, CubeTransparentIcon, DatabaseIcon } from '@heroicons/react/outline';

interface CategoryIconProps {
  category: string;
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

const CategoryIcon: React.FC<CategoryIconProps> = ({category}) => {
  const Icon = getProductIcon(category);
  return <Icon className={CLASSNAME}/>;
};

export default CategoryIcon;