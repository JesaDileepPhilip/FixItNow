import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import IssueCard from './../components/IssueCard';
import FilterNavbar from './../components/FilterNavbar';
import IssueModal from './../components/IssueModal';
//import Footer from './components/Footer';
import { mockIssues } from './../components/Types';
import './PublicDashboard.css';

function PublicDashboard() {
  const [issues] = useState(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    location: '',
    dateRange: ''
  });

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || issue.category === filters.category;
      const matchesStatus = !filters.status || issue.status === filters.status;
      const matchesLocation = !filters.location || issue.location.toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
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
            {filteredIssues.map(issue => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onUpvote={handleUpvote}
                onViewDetails={handleViewDetails}
              />
            ))}
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