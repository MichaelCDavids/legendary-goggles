import React from 'react';
import './PriceInput.css';

const PriceInput = ({ label, name, value, onChange }) => {
  const handleStep = (step) => {
    const currentValue = parseFloat(value) || 0;
    const newValue = currentValue + step;
    onChange({ target: { name, value: newValue.toFixed(5) } });
  };

  return (
    <div className="price-input-wrapper">
      <label>{label}</label>
      <div className="price-input">
        <input type="number" name={name} value={value} onChange={onChange} className="price-input__field" step="0.00001" />
        <div className="price-input__controls">
          <button type="button" onClick={() => handleStep(0.0001)} className="price-input__button price-input__button--up">&#9650;</button>
          <button type="button" onClick={() => handleStep(-0.0001)} className="price-input__button price-input__button--down">&#9660;</button>
        </div>
      </div>
    </div>
  );
};

export default PriceInput;
