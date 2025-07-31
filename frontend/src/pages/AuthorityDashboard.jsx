import React, { useState, useMemo } from "react";
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

const mockIssues = [
  {
    id: 1,
    title: "Broken Street Light on Main Avenue",
    description:
      "The street light has been flickering for weeks and finally went out completely. This creates a safety hazard for pedestrians and drivers, especially during evening hours.",
    category: "Infrastructure",
    location: "Downtown",
    status: "pending",
    upvotes: 23,
    timestamp: "2024-01-15T10:30:00Z",
    image:
      "https://images.pexels.com/photos/327458/pexels-photo-327458.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    title: "Garbage Overflow at Park Entrance",
    description:
      "Multiple garbage bins are overflowing at the main park entrance. The waste is attracting pests and creating an unpleasant odor for visitors.",
    category: "Waste Management",
    location: "Central Park",
    status: "in-progress",
    upvotes: 45,
    timestamp: "2024-01-14T14:15:00Z",
    image:
      "https://images.pexels.com/photos/2827735/pexels-photo-2827735.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    title: "Pothole on 5th Street",
    description:
      "Large pothole has formed after recent rains. It's causing damage to vehicles and poses a risk to cyclists and motorcyclists.",
    category: "Roads",
    location: "Residential Area",
    status: "resolved",
    upvotes: 67,
    timestamp: "2024-01-13T09:20:00Z",
    image:
      "https://images.pexels.com/photos/163016/highway-asphalt-space-sky-163016.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    title: "Illegal Dumping Site",
    description:
      "Construction debris and household waste have been illegally dumped in the vacant lot. This is creating environmental and health concerns for nearby residents.",
    category: "Environment",
    location: "Industrial Zone",
    status: "pending",
    upvotes: 34,
    timestamp: "2024-01-12T16:45:00Z",
    image:
      "https://images.pexels.com/photos/2586819/pexels-photo-2586819.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    title: "Water Leak in Public Restroom",
    description:
      "Continuous water leak in the public restroom at the community center. Water is pooling on the floor creating slip hazards.",
    category: "Utilities",
    location: "Community Center",
    status: "in-progress",
    upvotes: 19,
    timestamp: "2024-01-11T11:30:00Z",
    image:
      "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 6,
    title: "Damaged Park Bench",
    description:
      "Park bench has broken slats and sharp edges. It's unsafe for public use and needs immediate repair or replacement.",
    category: "Parks & Recreation",
    location: "Downtown",
    status: "resolved",
    upvotes: 12,
    timestamp: "2024-01-10T08:15:00Z",
    image:
      "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

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
  // const [selectedLocation, setSelectedLocation] = useState("all");
  const [locationSearch, setLocationSearch] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  

  const filteredIssues = useMemo(() => {
    if (!locationSearch.trim()) return mockIssues;
    return mockIssues.filter((issue) =>
      issue.location.toLowerCase().includes(locationSearch.trim().toLowerCase())
    );
  }, [locationSearch]);


  const stats = useMemo(() => {
    const total = filteredIssues.length;
    const pending = filteredIssues.filter(
      (issue) => issue.status === "pending"
    ).length;
    const inProgress = filteredIssues.filter(
      (issue) => issue.status === "in-progress"
    ).length;
    const resolved = filteredIssues.filter(
      (issue) => issue.status === "resolved"
    ).length;

    return { total, pending, inProgress, resolved };
  }, [filteredIssues]);

  const handleStatusUpdate = (issueId, newStatus) => {
    console.log(`Updating issue ${issueId} status to ${newStatus}`);
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
                onChange={(e) => setLocationSearch(e.target.value)}
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

          {filteredIssues.length === 0 ? (
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
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="issue-image"
                      />

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