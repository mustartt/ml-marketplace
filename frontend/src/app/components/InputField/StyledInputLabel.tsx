import React from 'react';

const StyledInputLabel: React.FC = ({children}) => (
  <label className="font-semibold text-lg pl-3">
    {children}
  </label>
);

export default StyledInputLabel;