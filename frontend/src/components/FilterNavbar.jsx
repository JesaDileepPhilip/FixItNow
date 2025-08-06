import React from 'react';
import './FilterNavbar.css';

const FilterNavbar = ({ filters, onFiltersChange }) => {
  const categories = [
    'Road Issues',
    'Garbage/Waste', 
    'Water Issues',
    'Electrical Problems',
    'Trees & Vegetation',
    'Street Lights'
  ];
  const statuses = ['open', 'pending', 'in-progress', 'resolved'];
  const locations = ['District 1', 'District 2', 'District 3', 'District 4'];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      status: '',
      location: '',
      dateRange: ''
    });
  };

  return (
    <div className="filter-navbar">
      <div className="container">
        <div className="filter-content">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Location</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="filter-select"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterNavbar;