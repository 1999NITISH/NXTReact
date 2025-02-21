// ErrorView.js
import React from 'react';

const ErrorView = ({ onRetry }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};

export default ErrorView;