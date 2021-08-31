import React, { useRef } from 'react';

interface StyledTextAreaInputProps {
  value: string;
  setValue: (val: string) => void;
}

const StyledTextAreaInput: React.FC<StyledTextAreaInputProps> = ({value, setValue}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <textarea
      className="block w-full h-32 py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 bg-white rounded-lg shadow-md focus:shadow-xl cursor-text sm:text-sm"
      value={value}
      onChange={handleChange}/>
  );
};

export default StyledTextAreaInput;