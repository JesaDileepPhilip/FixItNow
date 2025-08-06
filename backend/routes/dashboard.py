from fastapi import APIRouter, HTTPException, Query, Form, File, UploadFile, Depends
from clients.supabase_client import supabase
from typing import Optional

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/issues")
def get_public_issues():
    try:
        response = supabase.table("issues").select("*").execute()
        if not response.data:
            return {"message": "No issues found", "issues": []}
        return {"issues": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch issues: {str(e)}")
async def get_filtered_issues(
    category: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    start_date: Optional[str] = Query(None),  # Example: "2025-08-01T00:00:00Z"
    end_date: Optional[str] = Query(None),    # Example: "2025-08-06T23:59:59Z"
):
    try:
        query = supabase.table("issues").select("*")

        if category:
            query = query.eq("category", category)
        if status:
            query = query.eq("status", status)
        if location:
            query = query.ilike("location", f"%{location}%")
        if start_date and end_date:
            query = query.gte("created_at", start_date).lte("created_at", end_date)

        response = query.order("created_at", desc=True).execute()

        return {"issues": response.data}

    except Exception as e:
        print(f"Error filtering issues: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch filtered issues")