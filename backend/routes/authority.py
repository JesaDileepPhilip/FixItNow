# routes/authority.py

from fastapi import APIRouter, HTTPException, Query, Depends
from clients.supabase_client import supabase
from typing import Optional, List
from pydantic import BaseModel, validator
from datetime import datetime
import re

router = APIRouter()

class Issue(BaseModel):
    id: str
    title: str
    description: str
    category: str
    location: str
    image: Optional[str] = None  
    status: str
    upvotes: Optional[int] = 0
    timestamp: datetime  
    
    @validator('status')
    def validate_status(cls, v):
        valid_statuses = {"pending", "in-progress", "resolved"}
        if v not in valid_statuses:
            raise ValueError(f"Status must be one of: {valid_statuses}")
        return v

class DashboardStats(BaseModel):
    total: int
    pending: int
    inProgress: int  
    resolved: int

def validate_location(location: str) -> str:
    """Sanitize and validate location input"""
    if not location or len(location.strip()) == 0:
        return ""
    
    sanitized = re.sub(r'[<>"\']', '', location.strip())
    return sanitized

@router.get("/authority/issues", response_model=List[Issue])
def get_issues(
    location: Optional[str] = Query(None, description="Filter by location (partial match)"),
    status: Optional[str] = Query(None, description="Filter by status: pending, in-progress, resolved")
):
    """
    Get issues with optional filtering by location and status.
    Supports partial location matching and exact status matching.
    """
    try:
        query = supabase.table("issues").select("*")

        if location:
            sanitized_location = validate_location(location)
            if sanitized_location:
                query = query.ilike("location", f"%{sanitized_location}%")

        if status:
            valid_statuses = {"pending", "in-progress", "resolved"}
            if status not in valid_statuses:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid status. Must be one of: {valid_statuses}"
                )
            query = query.eq("status", status)

        result = query.order("created_at", desc=True).execute()
        
        if not result.data:
            return []
        
        transformed_data = []
        for issue in result.data:
            transformed_issue = {
                "id": str(issue.get("id", "")),
                "title": issue.get("title", ""),
                "description": issue.get("description", ""),
                "category": issue.get("category", ""),
                "location": issue.get("location", ""),
                "image": issue.get("photo_url"),  
                "status": issue.get("status", "pending"),
                "upvotes": issue.get("upvotes", 0),
                "timestamp": issue.get("created_at") 
            }
            transformed_data.append(transformed_issue)
        
        return transformed_data
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_issues: {str(e)}")  # Add logging
        raise HTTPException(status_code=500, detail=f"Failed to fetch issues: {str(e)}")

@router.get("/authority/stats", response_model=DashboardStats)
def get_dashboard_stats(
    location: Optional[str] = Query(None, description="Filter stats by location")
):
    """
    Get dashboard statistics for authority dashboard.
    Returns counts for total, pending, in-progress, and resolved issues.
    """
    try:
        query = supabase.table("issues").select("*")
        
        if location:
            sanitized_location = validate_location(location)
            if sanitized_location:
                query = query.ilike("location", f"%{sanitized_location}%")
        
        result = query.execute()
        
        if not result.data:
            return DashboardStats(total=0, pending=0, inProgress=0, resolved=0)
        
        total = len(result.data)
        
        status_counts = {}
        for issue in result.data:
            status = issue.get("status", "pending")
            status_counts[status] = status_counts.get(status, 0) + 1
        
        pending = status_counts.get("pending", 0)
        in_progress = status_counts.get("in-progress", 0) + status_counts.get("in_progress", 0)  # Handle both formats
        resolved = status_counts.get("resolved", 0)
        
        return DashboardStats(
            total=total,
            pending=pending,
            inProgress=in_progress,
            resolved=resolved
        )
        
    except Exception as e:
        print(f"Error in get_dashboard_stats: {str(e)}")  # Add logging
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")

class IssueStatusUpdate(BaseModel):
    issue_id: str
    new_status: str
    
    @validator('new_status')
    def validate_status(cls, v):
        valid_statuses = {"pending", "in-progress", "resolved"}
        if v not in valid_statuses:
            raise ValueError(f"Status must be one of: {valid_statuses}")
        return v

@router.patch("/authority/issues/update-status")
def update_issue_status(payload: IssueStatusUpdate):
    """
    Update the status of an issue.
    Valid statuses: pending, in-progress, resolved
    """
    try:
        if not payload.issue_id or len(payload.issue_id.strip()) == 0:
            raise HTTPException(status_code=400, detail="Issue ID is required")
        
        res = supabase.table("issues").update({
            "status": payload.new_status
        }).eq("id", payload.issue_id).execute()
        
        if not res.data:
            raise HTTPException(status_code=404, detail="Issue not found")
        
        return {
            "message": "Issue status updated successfully",
            "issue_id": payload.issue_id,
            "new_status": payload.new_status
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update issue status: {str(e)}")

@router.get("/authority/health")
def health_check():
    """
    Simple health check to test Supabase connection
    """
    try:
        # Test basic connection
        result = supabase.table("issues").select("count", count="exact").limit(1).execute()
        return {"status": "healthy", "message": "Supabase connection working", "data": result}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@router.get("/authority/test")
def test_endpoint():
    """
    Simple test endpoint that returns mock data
    """
    return {
        "status": "working",
        "message": "Backend is responding correctly",
        "timestamp": "2024-01-01T00:00:00Z"
    }

@router.get("/authority/mock-issues")
def get_mock_issues():
    """
    Mock issues endpoint for testing frontend
    """
    mock_issues = [
        {
            "id": "1",
            "title": "Pothole on Main Street",
            "description": "Large pothole causing traffic issues",
            "category": "Roads",
            "location": "Main Street, Downtown",
            "image": None,
            "status": "pending",
            "upvotes": 5,
            "timestamp": "2024-01-01T10:00:00Z"
        },
        {
            "id": "2", 
            "title": "Broken Street Light",
            "description": "Street light not working at night",
            "category": "Lighting",
            "location": "Oak Avenue",
            "image": None,
            "status": "in-progress",
            "upvotes": 3,
            "timestamp": "2024-01-01T09:00:00Z"
        },
        {
            "id": "3",
            "title": "Garbage Can Overflowing",
            "description": "Public garbage can is full and overflowing",
            "category": "Sanitation",
            "location": "City Park",
            "image": None,
            "status": "resolved",
            "upvotes": 2,
            "timestamp": "2024-01-01T08:00:00Z"
        }
    ]
    return mock_issues

@router.get("/authority/mock-stats")
def get_mock_stats():
    """
    Mock stats endpoint for testing frontend
    """
    return {
        "total": 3,
        "pending": 1,
        "inProgress": 1,
        "resolved": 1
    }