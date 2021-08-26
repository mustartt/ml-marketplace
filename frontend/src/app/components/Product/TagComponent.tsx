import React from 'react';

export type TagType = {
  name: string,
  link?: string,
}

const TagComponent: React.FC<TagType> = ({name, link}) => {
  return (
    <a href={link || '#'}
       className="inline-block bg-indigo-600 pt-1 pb-1.5 px-2.5 leading-none font-semibold text-gray-100 rounded-full shadow hover:bg-indigo-500 transition duration-150">
      {name}
    </a>
  );
};

export default TagComponent;