import React, { useState } from 'react';
import './ReportIssue.css';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="report-issue-container">
      <div className="report-header">
        <h1>Report an Issue</h1>
        <p>Help improve your community by reporting infrastructure problems</p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Issue Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Brief description of the issue"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="road">Road & Infrastructure</option>
            <option value="garbage">Garbage & Waste</option>
            <option value="water">Water & Drainage</option>
            <option value="electricity">Electricity & Power</option>
            <option value="trees">Trees & Parks</option>
            <option value="streetlight">Street Lighting</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide more details about the issue..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Photo</label>
          <div className="file-upload-area">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <div className="file-upload-content">
              <i className="upload-icon">📷</i>
              <p>Click to upload or drag and drop</p>
              <span>PNG, JPG up to 5MB</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <div className="location-input-group">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter address or landmark"
              required
            />
            <button type="button" className="location-btn">
              📍 Use GPS
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;