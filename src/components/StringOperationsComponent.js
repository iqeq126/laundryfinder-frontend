import React from 'react';

import React from 'react';

const StringOperationsComponent = ({ stringToSplit }) => {
  const splitArray = stringToSplit.split(',');

  // Perform string addition
  const result = splitArray.reduce((accumulator, current) => {
    return accumulator + current.trim();
  }, '');

  return <div>{result}</div>;
};

export default StringOperationsComponent;