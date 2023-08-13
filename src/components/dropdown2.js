import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'Option 1', label: 'Option 1', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl.png` },
  { value: 'Option 2', label: 'Option 2', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_cl_no.png` },
  { value: 'Option 3', label: 'Option 3', image: `${process.env.PUBLIC_URL}/tag_images/cleanser_o2.png` },
];

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <Select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        getOptionLabel={(option) => (
          <div>
            <img src={option.image} alt="Option" style={{ width: '20px', marginRight: '10px' }} />
            {option.label}
          </div>
        )}
        isClearable
        placeholder="-- Select --"
      />
      {selectedOption && (
        <div>
          <p>Selected option: {selectedOption.label}</p>
          <img src={selectedOption.image} alt="Selected Option" />
        </div>
      )}
    </div>
  );
};

export default Dropdown;

/*import React, { useState } from 'react';

const Dropdown = () => {
  const paths = window.location.href.split('/');
  const url = '/' + paths[paths.length - 2] + '/' + paths[paths.length - 1];
  const [selectedOption, setSelectedOption] = useState('');
  const [useDropdown, setUseDropdown] = useState(true);
  const [customOption, setCustomOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setUseDropdown(!useDropdown);
  };

  const handleInputChange = (event) => {
    setCustomOption(event.target.value);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={useDropdown} onChange={handleCheckboxChange} /> Use dropdown menu
      </label>

      {useDropdown ? (
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Dry</option>
          <option value="cleanser_cl.png">{<img src="`${process.env.PUBLIC_URL}/tag_images/` + `cleanser_cl.png`"/>}</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      ) : (
        <input type="text" value={customOption} onChange={handleInputChange} placeholder="Enter custom option" />
      )}

      <p>Selected option: {useDropdown ? selectedOption : customOption}</p>
    </div>
  );
};

export default Dropdown;
*/