# FixItNow - Authority Dashboard

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

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- Supabase account and project

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
python -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
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

The frontend will be available at `http://localhost:5173` (or similar port)

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

## 🔐 Authority Account Creation

Since authorities are created by developers, use the provided utility:

```bash
cd backend
python utils/generate_hash.py --username admin --password your_password
```

This will generate a hashed password that you can insert into the `authority` table.

## 📡 API Endpoints

### Authority Endpoints
- `GET /authority/health` - Health check
- `GET /authority/issues` - Get all issues (with optional filters)
- `GET /authority/stats` - Get dashboard statistics
- `PATCH /authority/issues/{issue_id}` - Update issue status
- `POST /authority/login` - Authority login

### User Endpoints
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile

## 🎯 Usage

1. **Start both servers** (backend and frontend)
2. **Login as authority** using credentials created with the hash utility
3. **View issues** on the dashboard
4. **Filter by location** using the search bar
5. **Update status** by clicking on issue cards
6. **Monitor statistics** in the dashboard header

## 🔧 Development

### Backend Development
- Server auto-reloads on file changes
- API documentation available at `http://127.0.0.1:8000/docs`
- CORS configured for frontend development

### Frontend Development
- Hot module replacement enabled
- API calls configured to backend
- Responsive design with modern UI

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend is running on `127.0.0.1:8000`
   - Check that frontend port is in CORS allowlist

2. **Database Connection Errors**
   - Verify Supabase credentials in `.env`
   - Check database schema matches requirements

3. **Module Not Found Errors**
   - Install missing dependencies: `pip install -r requirements.txt`
   - For email validation: `pip install email-validator`

4. **Port Already in Use**
   - Backend: Change port in uvicorn command
   - Frontend: Vite will automatically find next available port

## 📝 License

[Your License Here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please create an issue in the repository.
