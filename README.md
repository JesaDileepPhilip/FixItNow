# FixItNow 

A full-stack application for managing and tracking civic issues with an authority dashboard for status updates and issue management.

## 🚀 Features

- **Real-time Issue Tracking** - View and manage civic issues
- **Status Management** - Update issue status (pending/in-progress/resolved)
- **Location Filtering** - Search issues by location
- **Dashboard Statistics** - Real-time counts and analytics
- **Responsive Design** - Works on all devices
- **Secure Authentication** - Authority login system

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Supabase** - Backend-as-a-Service for database and auth
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Build tool and development server
- **CSS** - Styling and responsive design
##  Screenshots

###  Login Page
![Login](https://github.com/merineldos/FixItNow/blob/main/images/Login.png?raw=true)

### Role View
![Role](https://github.com/merineldos/FixItNow/blob/main/images/Role.png?raw=true)

###  Landing Page
![Landing](https://github.com/merineldos/FixItNow/blob/main/images/Landing.png?raw=true)

###  Report Issue
![Report Issue](https://github.com/merineldos/FixItNow/blob/main/images/ReportIssue.png?raw=true)

###  Report Location
![Report Location](https://github.com/merineldos/FixItNow/blob/main/images/ReportLocation.png?raw=true)

###  Public Dashboard
![Public Dashboard](https://github.com/merineldos/FixItNow/blob/main/images/PublicDashboard.png?raw=true)

###  Comments on Report
![Comments on Report](https://github.com/merineldos/FixItNow/blob/main/images/Comments_onReport.png?raw=true)

###  Issue Card
![Issue Card](https://github.com/merineldos/FixItNow/blob/main/images/IssueCard.png?raw=true)


###  Authority Login
![Authority Login](https://github.com/merineldos/FixItNow/blob/main/images/AuthorityLogin.png?raw=true)

###  Authority Dashboard
![Authority Dashboard](https://github.com/merineldos/FixItNow/blob/main/images/AuthorityDahboard.png?raw=true)

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd FixItNow
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Environment Variables
Create a `.env` file in the `backend` directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Run Backend Server
```bash
python app.py
```

The backend will be available at `http://127.0.0.1:8000`

### 3. Frontend Setup

#### Install Node Dependencies
```bash
cd frontend
npm install
```

#### Run Frontend Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Database Setup

#### Supabase Configuration
1. Create a Supabase project
2. Set up the following tables:
   - `issues` - For storing civic issues
   - `authority` - For authority accounts
   - `users` - For user accounts

#### Required Database Schema

**Issues Table:**
```sql
CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  status TEXT DEFAULT 'pending',
  image TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);
```

**Authority Table:**
```sql
CREATE TABLE authority (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE
);
```


##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please create an issue in the repository.
