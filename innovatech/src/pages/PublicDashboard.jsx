import React, { useState, useEffect } from 'react';
import './PublicDashboard.css';

const PublicDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockIssues = [
      {
        id: 1,
        title: 'Pothole on Main Street',
        category: 'roads',
        status: 'in_progress',
        urgency: 'high',
        location: '123 Main Street',
        dateReported: '2025-01-15',
        reportedBy: 'John Doe'
      },
      {
        id: 2,
        title: 'Broken Streetlight',
        category: 'utilities',
        status: 'pending',
        urgency: 'medium',
        location: 'Oak Avenue & 5th Street',
        dateReported: '2025-01-14',
        reportedBy: 'Jane Smith'
      },
      {
        id: 3,
        title: 'Garbage Collection Issue',
        category: 'environment',
        status: 'resolved',
        urgency: 'low',
        location: 'Pine Street',
        dateReported: '2025-01-10',
        reportedBy: 'Mike Johnson'
      }
    ];
    setIssues(mockIssues);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in_progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'low': return 'urgency-low';
      case 'medium': return 'urgency-medium';
      case 'high': return 'urgency-high';
      case 'critical': return 'urgency-critical';
      default: return '';
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true;
    return issue.status === filter;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Public Issues Dashboard</h1>
        <p>Track the status of reported civic issues in your community</p>
      </div>

      <div className="dashboard-controls">
        <div className="filter-group">
          <label htmlFor="filter">Filter by Status:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Issues</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="sort-group">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="urgency">Urgency Level</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      <div className="issues-grid">
        {filteredIssues.map(issue => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <h3>{issue.title}</h3>
              <div className="issue-badges">
                <span className={`status-badge ${getStatusClass(issue.status)}`}>
                  {issue.status.replace('_', ' ')}
                </span>
                <span className={`urgency-badge ${getUrgencyClass(issue.urgency)}`}>
                  {issue.urgency}
                </span>
              </div>
            </div>
            
            <div className="issue-details">
              <p><strong>Category:</strong> {issue.category}</p>
              <p><strong>Location:</strong> {issue.location}</p>
              <p><strong>Reported by:</strong> {issue.reportedBy}</p>
              <p><strong>Date:</strong> {new Date(issue.dateReported).toLocaleDateString()}</p>
            </div>
            
            <div className="issue-actions">
              <button className="btn-view">View Details</button>
              <button className="btn-follow">Follow Issue</button>
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="no-issues">
          <p>No issues found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PublicDashboard;
