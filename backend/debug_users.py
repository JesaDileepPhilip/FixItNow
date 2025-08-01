from clients.supabase_client import supabase

def check_users():
    try:
        # Get all users from the users table
        response = supabase.table("users").select("*").execute()
        print("Users in database:")
        for user in response.data:
            print(f"ID: {user['id']}")
            print(f"Email: {user['email']}")
            print(f"Name: {user['name']}")
            print("---")
        
        # Get all auth users from Supabase Auth
        auth_users = supabase.auth.admin.list_users()
        print("\nAuth users:")
        for user in auth_users:
            print(f"ID: {user.id}")
            print(f"Email: {user.email}")
            print("---")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_users() 