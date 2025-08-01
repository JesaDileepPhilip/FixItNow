import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
# Remove JWT_SECRET_KEY since we're using Supabase's JWT
JWT_ALGORITHM = "HS256"
