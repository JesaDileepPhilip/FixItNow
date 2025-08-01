from clients.supabase_client import supabase

def list_tables():
    try:
        # Try to get information about tables
        # Note: This might not work with Supabase client directly
        # You might need to check in Supabase dashboard
        
        # Let's try to query some common table names
        tables_to_check = ['departments', 'authority', 'authorities', 'users', 'officers', 'staff']
        
        for table_name in tables_to_check:
            try:
                response = supabase.table(table_name).select("*").limit(1).execute()
                print(f"✅ Table '{table_name}' exists")
                if response.data:
                    print(f"   Columns: {list(response.data[0].keys())}")
            except Exception as e:
                print(f"❌ Table '{table_name}' does not exist or error: {str(e)[:100]}")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_tables() 