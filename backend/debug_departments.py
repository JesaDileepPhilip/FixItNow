from clients.supabase_client import supabase

def check_departments_table():
    try:
        # Get all records from departments table
        response = supabase.table("departments").select("*").limit(5).execute()
        print("Departments table structure:")
        if response.data:
            # Print the first record to see column names
            first_record = response.data[0]
            print("Columns found:")
            for key in first_record.keys():
                print(f"  - {key}")
            print("\nSample data:")
            for record in response.data:
                print(record)
        else:
            print("No data found in departments table")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_departments_table() 