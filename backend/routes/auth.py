from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from clients.supabase_client import supabase
from passlib.context import CryptContext
from typing import Optional
from datetime import datetime, timedelta
import jwt
from config.settings import JWT_ALGORITHM

router = APIRouter(prefix="/auth", tags=["authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    username: str

class UserLogin(BaseModel):
    username: str
    password: str

class AuthorityLogin(BaseModel):
    username: str
    password: str

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

@router.post("/user/signup")
async def user_signup(payload: UserSignup):
    try:
        # Check if user already exists in our users table
        existing_user = supabase.table("users").select("*").eq("email", payload.email).limit(1).execute()
        if existing_user.data:
            raise HTTPException(status_code=400, detail="User with this email already exists")
        
        # Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": payload.email,
            "password": payload.password,
            "options": {
                "data": {
                    "username": payload.username
                }
            }
        })
        
        if not auth_response.user:
            raise HTTPException(status_code=400, detail="Signup failed")
        
        user_id = auth_response.user.id
        
        # Store in users table
        user_data = {
            "id": user_id,
            "email": payload.email,
            "name": payload.username,
            "password_hash": hash_password(payload.password),
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        try:
            supabase.table("users").insert(user_data).execute()
        except Exception as db_error:
            # If database insert fails, try to delete the auth user
            try:
                # Note: You might need admin privileges to delete users
                pass
            except:
                pass
            raise HTTPException(status_code=500, detail=f"Failed to create user profile: {str(db_error)}")
        
        # Try to sign in immediately to get tokens
        try:
            signin_response = supabase.auth.sign_in_with_password({
                "email": payload.email,
                "password": payload.password
            })
            
            if signin_response.session:
                return {
                    "message": "User signup successful",
                    "access_token": signin_response.session.access_token,
                    "refresh_token": signin_response.session.refresh_token,
                    "user": {
                        "id": user_id,
                        "email": payload.email,
                        "username": payload.username,
                        "role": "user"
                    }
                }
        except Exception as signin_error:
            print(f"Immediate signin failed: {signin_error}")
        
        # If immediate signin fails, return success without tokens
        return {
            "message": "User signup successful. Please log in to continue.",
            "user": {
                "id": user_id,
                "email": payload.email,
                "username": payload.username,
                "role": "user"
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        if "already registered" in str(e).lower():
            raise HTTPException(status_code=400, detail="User with this email already exists")
        raise HTTPException(status_code=500, detail=f"Signup failed: {str(e)}")

@router.post("/user/login")
async def user_login(payload: UserLogin):
    try:
        print(f"Login attempt for username: {payload.username}")
        
        # First, get user data from users table using username
        user_response = supabase.table("users").select("*").eq("name", payload.username).limit(1).execute()
        
        print(f"User response: {user_response.data}")
        
        if not user_response.data:
            print("No user found with this username")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        user_data = user_response.data[0]
        user_email = user_data["email"]
        
        print(f"Found user with email: {user_email}")
        
        # Authenticate with Supabase using email
        try:
            auth_response = supabase.auth.sign_in_with_password({
                "email": user_email,
                "password": payload.password
            })
            
            print(f"Auth response: {auth_response}")
            
            if not auth_response.session:
                print("No session returned from Supabase Auth")
                raise HTTPException(status_code=401, detail="Invalid credentials")
                
        except Exception as auth_error:
            if "Email not confirmed" in str(auth_error):
                # For development, you can auto-confirm the email
                print("Email not confirmed, attempting to confirm...")
                try:
                    # This would require admin privileges
                    # For now, return a helpful error message
                    raise HTTPException(status_code=401, detail="Please confirm your email before logging in. Check your inbox for a confirmation link.")
                except:
                    raise HTTPException(status_code=401, detail="Email not confirmed. Please check your email and click the confirmation link.")
            else:
                raise auth_error
        
        return {
            "message": "User login successful",
            "access_token": auth_response.session.access_token,
            "refresh_token": auth_response.session.refresh_token,
            "user": {
                "id": user_data["id"],
                "email": user_data["email"],
                "username": user_data["name"],
                "role": "user"
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Invalid credentials: {str(e)}")

@router.post("/authority/login")
async def authority_login(payload: AuthorityLogin):
    try:
        print(f"Authority login attempt for username: {payload.username}")
        
        # Get authority from departments table
        response = supabase.table("departments").select("*").eq("name", payload.username).limit(1).execute()
        
        print(f"Department response: {response.data}")
        
        if not response.data:
            print("No authority found with this username")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        auth_record = response.data[0]
        
        # Verify password
        if not verify_password(payload.password, auth_record.get("password_hash")):
            print("Password verification failed")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        if not auth_record.get("approved", False):
            print("Authority not approved")
            raise HTTPException(status_code=403, detail="Authority not approved")
        
        # Create a simple session token for authority
        session_data = {
            "authority_id": auth_record["id"],
            "username": auth_record["username"],
            "role": "authority",
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
        
        return {
            "message": "Authority login successful",
            "session_data": session_data,
            "authority": {
                "id": auth_record["id"],
                "username": auth_record["username"],
                "role": "authority"
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Authority login error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

@router.get("/profile")
async def get_profile(token: str):
    try:
        # For users, verify with Supabase
        user = supabase.auth.get_user(token)
        
        if user.user:
            # Get user data from users table
            user_response = supabase.table("users").select("*").eq("id", user.user.id).limit(1).execute()
            
            if not user_response.data:
                raise HTTPException(status_code=404, detail="User not found")
            
            user_data = user_response.data[0]
            return {
                "id": user_data["id"],
                "email": user_data["email"],
                "username": user_data["name"],
                "role": "user",
                "created_at": user_data["created_at"]
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid token")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Profile fetch failed: {str(e)}")

@router.post("/logout")
async def logout():
    try:
        # Sign out from Supabase
        supabase.auth.sign_out()
        return {"message": "Logged out successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Logout failed: {str(e)}")

@router.delete("/cleanup-user/{email}")
async def cleanup_user(email: str):
    """Clean up orphaned user records (for development only)"""
    try:
        # Delete from users table
        supabase.table("users").delete().eq("email", email).execute()
        return {"message": f"Cleaned up user with email: {email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cleanup failed: {str(e)}")
