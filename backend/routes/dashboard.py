from fastapi import APIRouter, HTTPException
from clients.supabase_client import supabase

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
