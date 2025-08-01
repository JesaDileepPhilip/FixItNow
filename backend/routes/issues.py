from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from clients.supabase_client import supabase

router = APIRouter()

@router.post("/report-issue")
async def report_issue(
    description: str = Form(...),
    category: str = Form(...),
    intensity: int = Form(...),
    location: str = Form(...),
    photo: UploadFile = File(None)
):
    try:
        photo_url = None

        if photo:
            contents = await photo.read()
            path = f"issues/{photo.filename}"

            # Upload to Supabase Storage - simplified
            try:
                supabase.storage.from_("photos").upload(path, contents)
                photo_url = f"https://hwkjkmzwspmgfjqloypj.supabase.co/storage/v1/object/public/photos/{path}"
            except Exception as upload_error:
                print(f"Photo upload error: {upload_error}")
                # Continue without photo if upload fails
                photo_url = None

        # Insert into Supabase table
        res = supabase.table("issues").insert({
            "title": description[:50] + "..." if len(description) > 50 else description,  # Add title field
            "description": description,
            "category": category,
            "scale": intensity,
            "location": location,
            "photo_url": photo_url
        }).execute()
        

        return {"message": "Issue reported successfully", "data": res.data}

    except Exception as e:
        print(f"Error in report_issue: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error")
