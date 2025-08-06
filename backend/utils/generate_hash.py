import argparse
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def main():
    parser = argparse.ArgumentParser(description="Generate a hashed password for an authority.")
    parser.add_argument("--username", required=True, help="Username of the authority")
    parser.add_argument("--password", required=True, help="Plaintext password to be hashed")

    args = parser.parse_args()

    hashed_pw = hash_password(args.password)

    print("\n Authority credentials to insert into the database:\n")
    print(f"Name: {args.username}")
    print(f"Password (hashed): {hashed_pw}")
    print("\n  Copy and insert this into the 'departments' table manually.\n")

if __name__ == "__main__":
    main()
