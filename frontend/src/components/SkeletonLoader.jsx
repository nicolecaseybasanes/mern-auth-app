import React from 'react';

const SkeletonLoader = () => (
  <div className="skeleton-container">
    <div className="skeleton skeleton-heading" />
    <div className="skeleton skeleton-text" />
    <div className="skeleton skeleton-text" />
    <div className="skeleton skeleton-button" />
  </div>
);

export default SkeletonLoader;