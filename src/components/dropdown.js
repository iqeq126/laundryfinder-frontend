import React, { useState } from 'react';

function RecursiveDropdown({ options }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    console.log('Selected value:', newValue);
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  const renderNestedDropdowns = (options) => {
    return options.map((option) => (
      <optgroup key={option.value} label={option.label}>
        {option.children && option.children.length > 0 && (
          <RecursiveDropdown options={option.children} />
        )}
      </optgroup>
    ));
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        {renderOptions(options)}
        {renderNestedDropdowns(options)}
      </select>
      {selectedValue && <p>Selected value: {selectedValue}</p>}
    </div>
  );
}

export default RecursiveDropdown;
