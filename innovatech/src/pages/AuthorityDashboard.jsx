import React, { useState, useEffect } from 'react';
import './AuthorityDashboard.css';

const AuthorityDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockIssues = [
      {
        id: 1,
        title: 'Pothole on Main Street',
        category: 'roads',
        status: 'pending',
        urgency: 'high',
        location: '123 Main Street',
        dateReported: '2025-01-15',
        reportedBy: 'John Doe',
        description: 'Large pothole causing damage to vehicles',
        assignedTo: null,
        updates: []
      },
      {
        id: 2,
        title: 'Broken Streetlight',
        category: 'utilities',
        status: 'in_progress',
        urgency: 'medium',
        location: 'Oak Avenue & 5th Street',
        dateReported: '2025-01-14',
        reportedBy: 'Jane Smith',
        description: 'Streetlight has been out for 3 days',
        assignedTo: 'Public Works Team',
        updates: [
          { date: '2025-01-16', note: 'Issue assigned to maintenance crew', status: 'in_progress' }
        ]
      }
    ];
    setIssues(mockIssues);
  }, []);

  const handleStatusUpdate = (issue) => {
    setSelectedIssue(issue);
    setUpdateStatus(issue.status);
    setUpdateNote('');
    setShowModal(true);
  };

  const submitUpdate = () => {
    // Update the issue status and add note
    const updatedIssues = issues.map(issue => {
      if (issue.id === selectedIssue.id) {
        return {
          ...issue,
          status: updateStatus,
          updates: [
            ...issue.updates,
            {
              date: new Date().toISOString().split('T')[0],
              note: updateNote,
              status: updateStatus
            }
          ]
        };
      }
      return issue;
    });
    
    setIssues(updatedIssues);
    setShowModal(false);
    setSelectedIssue(null);
  };

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

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length
  };

  return (
    <div className="authority-dashboard">
      <div className="dashboard-header">
        <h1>Authority Dashboard</h1>
        <p>Manage and update reported civic issues</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Issues</p>
        </div>
        <div className="stat-card pending">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card progress">
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card resolved">
          <h3>{stats.resolved}</h3>
          <p>Resolved</p>
        </div>
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
            <option value="pending">Pending Review</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="issues-table">
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Status</th>
              <th>Urgency</th>
              <th>Location</th>
              <th>Reported</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map(issue => (
              <tr key={issue.id}>
                <td>
                  <div className="issue-title">{issue.title}</div>
                  <div className="issue-reporter">by {issue.reportedBy}</div>
                </td>
                <td>{issue.category}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(issue.status)}`}>
                    {issue.status.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <span className={`urgency-badge ${getUrgencyClass(issue.urgency)}`}>
                    {issue.urgency}
                  </span>
                </td>
                <td>{issue.location}</td>
                <td>{new Date(issue.dateReported).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="btn-update"
                    onClick={() => handleStatusUpdate(issue)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Issue Status</h3>
            <div className="modal-content">
              <div className="issue-info">
                <h4>{selectedIssue?.title}</h4>
                <p>{selectedIssue?.description}</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">New Status:</label>
                <select
                  id="status"
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="note">Update Note:</label>
                <textarea
                  id="note"
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  placeholder="Add a note about this update..."
                  rows="3"
                />
              </div>
              
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={submitUpdate}>
                  Save Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorityDashboard;
