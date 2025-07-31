import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, MapPin, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ReportIssue.css';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    intensity: 3,
    location: '',
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const categories = [
    'Road Issues',
    'Garbage/Waste',
    'Water Issues',
    'Electrical Problems',
    'Trees & Vegetation',
    'Street Lights'
  ];

  const intensityLabels = {
    1: { label: 'Low', color: '#10B981' },
    2: { label: 'Medium-Low', color: '#84CC16' },
    3: { label: 'Medium', color: '#F59E0B' },
    4: { label: 'Medium-High', color: '#F97316' },
    5: { label: 'High', color: '#EF4444' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIntensityChange = (e) => {
    setFormData(prev => ({
      ...prev,
      intensity: parseInt(e.target.value)
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Basic validation
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    if (!formData.location.trim()) {
      alert('Please enter a location');
      return;
    }
    
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Report submitted successfully!');
    navigate('/'); // Navigate back to home after submission
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="report-issue-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <div className="page-title">
          <Camera className="title-icon" />
          <span>Report an Issue</span>
        </div>
      </div>

      <div className="report-form-container">
        <form onSubmit={handleSubmit} className="report-form">
          {/* Photo Upload Section */}
          <div className="form-section">
            <label className="section-label">Upload Photo</label>
            <div className="photo-upload-area">
              {photoPreview ? (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Preview" className="preview-image" />
                  <button 
                    type="button" 
                    className="remove-photo"
                    onClick={() => {
                      setPhotoPreview(null);
                      setFormData(prev => ({ ...prev, photo: null }));
                      fileInputRef.current.value = '';
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div 
                  className="upload-placeholder"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={32} />
                  <span>Click to upload photo</span>
                  <small>JPG, PNG up to 5MB</small>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="file-input"
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="form-section">
            <label className="section-label" htmlFor="description">
              Issue Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the issue you want to report..."
              className="description-textarea"
              rows={4}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-section">
            <label className="section-label" htmlFor="category">
              Issue Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="category-select"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Section */}
          <div className="form-section">
            <label className="section-label" htmlFor="location">
              Location
            </label>
            <div className="location-input-group">
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location or use GPS"
                className="location-input"
                required
              />
              <button 
                type="button" 
                className="gps-button"
                onClick={getCurrentLocation}
                title="Get current location"
              >
                <MapPin size={20} />
              </button>
            </div>
          </div>

          {/* Intensity Scale */}
          <div className="form-section">
            <label className="section-label">
              Issue Intensity: <span className="intensity-label" style={{ color: intensityLabels[formData.intensity].color }}>
                {intensityLabels[formData.intensity].label}
              </span>
            </label>
            <div className="intensity-slider-container">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.intensity}
                onChange={handleIntensityChange}
                className="intensity-slider"
              />
              <div className="intensity-markers">
                {Object.entries(intensityLabels).map(([value, { label, color }]) => (
                  <div key={value} className="intensity-marker">
                    <div 
                      className="marker-dot" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="marker-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;