import React from 'react';
import { MapPin, ThumbsUp, Eye, Calendar } from 'lucide-react';
import './IssueCard.css';

const IssueCard = ({ issue, onUpvote, onViewDetails }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-pending';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'road issues': return 'category-road';
      case 'water issues': return 'category-water';
      case 'garbage/waste': return 'category-garbage';
      case 'electrical problems': return 'category-electricity';
      case 'trees & vegetation': return 'category-trees';
      case 'street lights': return 'category-light';
      default: return 'category-default';
    }
  };

  return (
    <div className="issue-card">
      {/* Display image from Supabase (photo_url) */}
      {issue.photo_url && (
        <div className="card-image">
          <img src={issue.photo_url} alt={issue.title || 'Issue image'} />
        </div>
      )}
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{issue.title}</h3>
          <div className="card-tags">
            <span className={`category-tag ${getCategoryColor(issue.category)}`}>
              {issue.category}
            </span>
            <span className={`status-tag ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
          </div>
        </div>
        
        <p className="card-description">{issue.description}</p>
        
        <div className="card-meta">
          <div className="meta-item">
            <MapPin size={16} />
            <span>{issue.location}</span>
          </div>
          <div className="meta-item">
            <Calendar size={16} />
            <span>{formatDate(issue.created_at || issue.submittedAt)}</span>
          </div>
        </div>
        
        <div className="card-actions">
          <button 
            className="upvote-btn"
            onClick={() => onUpvote(issue.id)}
          >
            <ThumbsUp size={16} />
            <span>{issue.upvotes}</span>
          </button>
          
          <button 
            className="details-btn"
            onClick={() => onViewDetails(issue)}
          >
            <Eye size={16} />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
