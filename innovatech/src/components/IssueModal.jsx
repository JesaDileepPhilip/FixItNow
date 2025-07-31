import React, { useState } from 'react';
import { X, MapPin, Calendar, User, ThumbsUp, MessageCircle } from 'lucide-react';
import './IssueModal.css';

const IssueModal = ({ issue, onClose, onUpvote }) => {
  const [newComment, setNewComment] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Resolved': return 'status-resolved';
      default: return 'status-pending';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Road': return 'category-road';
      case 'Water': return 'category-water';
      case 'Garbage': return 'category-garbage';
      case 'Electricity': return 'category-electricity';
      case 'Trees': return 'category-trees';
      case 'Street Light': return 'category-light';
      default: return 'category-default';
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, this would make an API call
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{issue.title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {issue.imageUrl && (
            <div className="modal-image">
              <img src={issue.imageUrl} alt={issue.title} />
            </div>
          )}

          <div className="modal-info">
            <div className="info-tags">
              <span className={`category-tag ${getCategoryColor(issue.category)}`}>
                {issue.category}
              </span>
              <span className={`status-tag ${getStatusColor(issue.status)}`}>
                {issue.status}
              </span>
            </div>

            <div className="info-meta">
              <div className="meta-item">
                <MapPin size={18} />
                <span>{issue.location}</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>{formatDate(issue.submittedAt)}</span>
              </div>
              <div className="meta-item">
                <User size={18} />
                <span>Reported by {issue.submittedBy}</span>
              </div>
            </div>

            <div className="modal-description">
              <h3>Description</h3>
              <p>{issue.description}</p>
            </div>

            <div className="modal-actions">
              <button 
                className="upvote-btn"
                onClick={() => onUpvote(issue.id)}
              >
                <ThumbsUp size={18} />
                <span>Upvote ({issue.upvotes})</span>
              </button>
            </div>

            <div className="comments-section">
              <h3>
                <MessageCircle size={20} />
                Comments ({issue.comments.length})
              </h3>

              {issue.comments.length > 0 ? (
                <div className="comments-list">
                  {issue.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              )}

              <form className="comment-form" onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="comment-input"
                  rows={3}
                />
                <button type="submit" className="submit-comment-btn">
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;