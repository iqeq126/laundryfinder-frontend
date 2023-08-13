import React from 'react';

function JSONVisualization({ data }) {
  const jsonStr = JSON.stringify(data, null, 2); // Convert JSON object to string with indentation

  return (
    <pre>{jsonStr}</pre>
  );
}

export default JSONVisualization;
