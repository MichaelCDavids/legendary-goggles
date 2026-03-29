import React from 'react';
import './CustomSelect.css';

const CustomSelect = ({ label, name, value, onChange, children }) => {
  return (
    <div className="custom-select-wrapper">
      <label>{label}</label>
      <div className="custom-select">
        <select name={name} value={value} onChange={onChange} className="custom-select__trigger">
          {children}
        </select>
        <div className="custom-select__arrow"></div>
      </div>
    </div>
  );
};

export default CustomSelect;
