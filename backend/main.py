from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import dashboard
from routes import issues
from routes import authority
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(dashboard.router)
app.include_router(issues.router)
app.include_router(authority.router)