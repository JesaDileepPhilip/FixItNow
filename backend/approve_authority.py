from clients.supabase_client import supabase

def approve_authority():
    try:
        # Update the Kseb record to set approved = true
        response = supabase.table("departments").update({"approved": True}).eq("name", "Kseb").execute()
        
        if response.data:
            print("Authority 'Kseb' has been approved!")
            print(f"Updated record: {response.data}")
        else:
            print(" No record found to update")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    approve_authority() 