import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import IssueCard from './../components/IssueCard';
import FilterNavbar from './../components/FilterNavbar';
import IssueModal from './../components/IssueModal';
import './PublicDashboard.css';
import axios from 'axios';

function PublicDashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    location: '',
    dateRange: ''
  });
useEffect(() => {
  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:8000/dashboard/issues");

      if (res.data && res.data.issues) {
        setIssues(res.data.issues);
      } else {
        setIssues([]);
      }
    } catch (err) {
      console.error("Error fetching issues:", err);
      setError("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  fetchIssues();
}, []);

const filteredIssues = useMemo(() => {
  return issues.filter(issue => {
    const title = issue.title?.toLowerCase() || '';
    const description = issue.description?.toLowerCase() || '';
    const location = issue.location?.toLowerCase() || '';
    const category = issue.category?.toLowerCase() || '';
    const status = issue.status?.toLowerCase() || '';

    const search = searchTerm.toLowerCase();
    const selectedCategory = filters.category.toLowerCase();
    const selectedStatus = filters.status.toLowerCase();
    const selectedLocation = filters.location.toLowerCase();

    const matchesSearch =
      title.includes(search) || description.includes(search);

    const matchesCategory = !selectedCategory || category === selectedCategory;
    const matchesStatus = !selectedStatus || status === selectedStatus;
    const matchesLocation = !selectedLocation || location.includes(selectedLocation);

    // Date range filtering
    let matchesDateRange = true;
    if (filters.dateRange && issue.created_at) {
      const issueDate = new Date(issue.created_at);
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      switch (filters.dateRange) {
        case 'today':
          matchesDateRange = issueDate >= startOfDay;
          break;
        case 'week':
          matchesDateRange = issueDate >= startOfWeek;
          break;
        case 'month':
          matchesDateRange = issueDate >= startOfMonth;
          break;
        default:
          matchesDateRange = true;
      }
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation && matchesDateRange;
  });
}, [issues, searchTerm, filters]);


  const handleUpvote = (issueId) => {
    // In a real app, this would make an API call
    console.log(`Upvoted issue: ${issueId}`);
  };

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseModal = () => {
    setSelectedIssue(null);
  };

  // if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container text-red-600">{error}</div>;


  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Dashboard</h1>
              <p>Report City Issues in Real-Time</p>
            </div>
            
            <div className="header-actions">
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <FilterNavbar
        filters={filters}
        onFiltersChange={setFilters}
      />

      <main className="main">
        <div className="container">
          <div className="content-header">
            <h2>Public Issues Dashboard</h2>
            <p className="results-count">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
          </div>
          
          <div className="issues-table">
            {filteredIssues.map(issue => {
              // Map backend fields to IssueCard expected props
              const mappedIssue = {
                ...issue,
                submittedAt: issue.timestamp || issue.submittedAt,
                image: issue.image // already correct from backend
              };
              return (
                <IssueCard
                  key={mappedIssue.id}
                  issue={mappedIssue}
                  onUpvote={handleUpvote}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
          
          {filteredIssues.length === 0 && (
            <div className="no-results">
              <p>No issues found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

     

      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onClose={handleCloseModal}
          onUpvote={handleUpvote}
        />
      )}
    </div>
  );
}

export default PublicDashboard;