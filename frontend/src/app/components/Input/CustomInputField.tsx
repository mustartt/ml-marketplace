import React, { ReactNode } from 'react';

interface CustomInputFieldProps {
  icon: ReactNode,
  name: string,
  label: string,
  placeholder?: string,
  inputType: string,
  inputRef?: React.Ref<HTMLInputElement>
}

const CustomInputField: React.FC<CustomInputFieldProps> = (props) => {
  const elementId = `input-field-${props.name}`;
  return (
    <>
      <label htmlFor={elementId} className="text-xs font-semibold px-1">{props.label}</label>
      <div className="flex">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          {props.icon}
        </div>
        <input id={elementId}
               type={props.inputType}
               ref={props.inputRef}
               className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
               placeholder={props.placeholder}/>
      </div>
    </>
  );
};

export default CustomInputField;