import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  Calendar,
  Filter,
  AlertCircle,
  Clock,
  CheckCircle,
  BarChart3,
  Camera,
  Edit3,
} from "lucide-react";
import "./AuthorityDashboard.css";

const API_BASE_URL = "http://127.0.0.1:8000";

const getRelativeTime = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
};

const AuthorityDashboard = () => {
  const [locationSearch, setLocationSearch] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = async (location = null) => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/authority/issues`;
      if (location) {
        url += `?location=${encodeURIComponent(location)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setIssues(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching issues:", err);
      setError("Failed to load issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (location = null) => {
    try {
      let url = `${API_BASE_URL}/authority/stats`;
      if (location) {
        url += `?location=${encodeURIComponent(location)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleStatusUpdate = async (issueId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authority/issues/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issue_id: issueId,
          new_status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchIssues(locationSearch || null);
      await fetchStats(locationSearch || null);
      
      console.log(`Successfully updated issue ${issueId} status to ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchStats();
  }, []);

  const filteredIssues = useMemo(() => {
    if (!locationSearch.trim()) return issues;
    return issues.filter((issue) =>
      issue.location.toLowerCase().includes(locationSearch.trim().toLowerCase())
    );
  }, [issues, locationSearch]);

  const handleLocationSearch = async (searchTerm) => {
    setLocationSearch(searchTerm);
    if (searchTerm.trim()) {
      await fetchIssues(searchTerm);
      await fetchStats(searchTerm);
    } else {
      await fetchIssues();
      await fetchStats();
    }
  };

  const toggleCard = (issueId) => {
    setExpandedCard(expandedCard === issueId ? null : issueId);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge status-pending";
      case "in-progress":
        return "status-badge status-in-progress";
      case "resolved":
        return "status-badge status-resolved";
      default:
        return "status-badge status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="status-icon" />;
      case "in-progress":
        return <Clock className="status-icon" />;
      case "resolved":
        return <CheckCircle className="status-icon" />;
      default:
        return <AlertCircle className="status-icon" />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <div>
              <h1 className="header-title">Authority Dashboard</h1>
              <p className="header-subtitle">
                Spot It, Report It, Fix It!
              </p>
            </div>
            <div className="location-filter">
              <Filter className="filter-icon" />
              <input
                type="text"
                placeholder="Search location..."
                value={locationSearch}
                onChange={(e) => handleLocationSearch(e.target.value)}
                className="location-search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Total Issues</p>
                <p className="stat-value">{stats.total}</p>
              </div>
              <div className="stat-icon-container stat-icon-blue">
                <BarChart3 className="stat-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Pending</p>
                <p className="stat-value stat-value-orange">{stats.pending}</p>
              </div>
              <div className="stat-icon-container stat-icon-orange">
                <AlertCircle className="stat-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">In Progress</p>
                <p className="stat-value stat-value-blue">{stats.inProgress}</p>
              </div>
              <div className="stat-icon-container stat-icon-blue">
                <Clock className="stat-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">Resolved</p>
                <p className="stat-value stat-value-green">{stats.resolved}</p>
              </div>
              <div className="stat-icon-container stat-icon-green">
                <CheckCircle className="stat-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="issues-section">
          <h2 className="issues-title">Recent Issues</h2>

          {loading && <p>Loading issues...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {filteredIssues.length === 0 && !loading && !error ? (
            <div className="no-issues">
              <AlertCircle className="no-issues-icon" />
              <p className="no-issues-text">
                No issues found for the selected location.
              </p>
            </div>
          ) : (
            <div className="issues-list">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="issue-card">
                  <div className="card-header">
                    <div className="card-content">
                      {issue.image ? (
                        <img
                          src={issue.image}
                          alt={issue.title}
                          className="issue-image"
                        />
                      ) : (
                        <div className="issue-image-placeholder">
                          <Camera className="placeholder-icon" />
                        </div>
                      )}

                      <div className="issue-info">
                        <div className="issue-main">
                          <div className="issue-details">
                            <h3 className="issue-title">{issue.title}</h3>

                            <div className="issue-meta">
                              <div className="meta-item">
                                <MapPin className="meta-icon" />
                                {issue.location}
                              </div>

                              <div className="meta-item">
                                <Calendar className="meta-icon" />
                                Reported {getRelativeTime(issue.timestamp)}
                              </div>

                              <div
                                className={getStatusBadgeClass(issue.status)}
                              >
                                {getStatusIcon(issue.status)}
                                {issue.status.charAt(0).toUpperCase() +
                                  issue.status.slice(1).replace("-", " ")}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleCard(issue.id)}
                            className="expand-button"
                          >
                            {expandedCard === issue.id ? (
                              <>
                                <ChevronUp className="expand-icon" />
                                Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="expand-icon" />
                                More
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {expandedCard === issue.id && (
                    <div className="expanded-content">
                      <div className="expanded-grid">
                        <div className="expanded-details">
                          <h4 className="expanded-title">Issue Details</h4>
                          <p className="issue-description">
                            {issue.description}
                          </p>

                          <div className="issue-attributes">
                            <div className="attribute-item">
                              <span className="attribute-label">Category:</span>
                              <span className="category-badge">
                                {issue.category}
                              </span>
                            </div>

                            <div className="attribute-item">
                              <ThumbsUp className="upvote-icon" />
                              <span className="upvote-text">
                                {issue.upvotes} citizen upvotes
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="expanded-actions">
                          <h4 className="expanded-title">Actions</h4>
                          <div className="actions-content">
                            <div className="status-update">
                              <label className="status-label">
                                Update Status
                              </label>
                              <select
                                value={issue.status}
                                onChange={(e) =>
                                  handleStatusUpdate(issue.id, e.target.value)
                                }
                                className="status-select"
                              >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                              </select>
                            </div>

                            <div className="action-buttons">
                              <button className="action-button action-button-primary">
                                <Edit3 className="button-icon" />
                                Update Issue
                              </button>

                              <button className="action-button action-button-secondary">
                                <Camera className="button-icon" />
                                View Image
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;