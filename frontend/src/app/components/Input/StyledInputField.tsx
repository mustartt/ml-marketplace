import React, { useRef } from 'react';

interface StyledInputFieldProps {
  value: string;
  placeholder?: string;
  setValue: (val: string) => void;
}

const StyledInputField: React.FC<StyledInputFieldProps> = ({value, placeholder, setValue}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputRef.current) {
      setValue(inputRef.current.value || '');
    }
  };

  return (
    <input
      type="text"
      className="w-full py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 bg-white rounded-lg shadow-md focus:shadow-xl cursor-text sm:text-sm"
      ref={inputRef}
      onChange={handleChange}
      placeholder={placeholder}/>
  );
};

export default StyledInputField;