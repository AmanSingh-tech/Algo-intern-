# 🚀 Algo-Task Deployment Guide

A comprehensive LeetCode-style coding platform with real-time code execution, AI-powered features, and modern UI.

## 🐳 Docker Deployment

### Prerequisites
- Docker & Docker Compose installed
- Git for cloning the repository

### Quick Start

1. **Clone and navigate to project**
   ```bash
   git clone <your-repo-url>
   cd algo-task
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Build and start all services**
   ```bash
   # Development environment
   docker-compose up --build

   # Production environment
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Compiler Service: http://localhost:3002
   - Database: localhost:5432

### 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Compiler      │
│   (Next.js)     │───▶│   (Express.js)  │───▶│   Service       │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 3002    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │   Port: 5432    │
                       └─────────────────┘
```

### 📋 Services

| Service    | Technology  | Port | Description                           |
|------------|-------------|------|---------------------------------------|
| Frontend   | Next.js     | 3000 | LeetCode-style UI with code editor    |
| Backend    | Express.js  | 8000 | REST API with authentication         |
| Compiler   | Node.js     | 3002 | Code execution service (C++, Python) |
| Database   | PostgreSQL  | 5432 | Data persistence with Prisma ORM     |

### 🔧 Environment Variables

| Variable                    | Description                  | Default                    |
|----------------------------|------------------------------|----------------------------|
| `POSTGRES_PASSWORD`        | Database password            | `algotask_password`        |
| `JWT_PASSKEY`             | JWT signing secret           | `change-in-production`     |
| `GOOGLE_GEMINI_API_KEY`   | AI features API key          | `your-api-key`            |
| `NEXT_PUBLIC_BACKEND_URL` | Frontend API endpoint        | `http://localhost:8000`    |
| `SALT_ROUNDS`             | Password hashing rounds      | `10`                       |

### 🛠️ Individual Service Commands

```bash
# Build specific service
docker-compose build frontend
docker-compose build server
docker-compose build compiler

# Start specific service
docker-compose up frontend
docker-compose up server postgres
docker-compose up compiler

# View logs
docker-compose logs -f frontend
docker-compose logs -f server

# Database operations
docker-compose exec server npx prisma migrate deploy
docker-compose exec server npx prisma studio
```

### 🚀 Production Deployment

1. **Use production docker-compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **Environment setup**
   ```bash
   # Create production .env
   POSTGRES_PASSWORD=your-secure-db-password
   JWT_PASSKEY=your-very-secure-jwt-secret-minimum-32-chars
   GOOGLE_GEMINI_API_KEY=your-actual-gemini-api-key
   NEXT_PUBLIC_BACKEND_URL=https://your-api-domain.com
   ```

3. **SSL/TLS Setup**
   - Use nginx proxy with Let's Encrypt
   - Or deploy behind a load balancer
   - Update `NEXT_PUBLIC_BACKEND_URL` to HTTPS

### 🎯 Features

- ✅ **LeetCode-Style Code Editor** with syntax highlighting
- ✅ **Real-time Code Execution** (C++, Python, JavaScript)  
- ✅ **Enhanced C++ Simulation** with control structures
- ✅ **User Authentication** with JWT
- ✅ **Problem Management** with CRUD operations
- ✅ **Leaderboard System** with rankings
- ✅ **Submission Tracking** and history
- ✅ **AI-Powered Features** (resume analysis, cover letters)
- ✅ **Modern UI** with dark/light themes
- ✅ **Responsive Design** for all devices

### 🐛 Troubleshooting

**Port conflicts:**
```bash
# Check what's using ports
ss -tlnp | grep :3000
# Kill processes if needed
sudo lsof -ti:3000 | xargs kill -9
```

**Database issues:**
```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres
docker-compose exec server npx prisma migrate deploy
```

**Build failures:**
```bash
# Clean everything
docker-compose down --rmi all -v
docker system prune -f
docker-compose up --build
```

### 📊 Monitoring

```bash
# Service status
docker-compose ps

# Resource usage
docker stats

# Health checks
curl http://localhost:3000  # Frontend
curl http://localhost:8000  # Backend API
curl http://localhost:3002  # Compiler
```

### 🔐 Security Notes

- Change all default passwords in production
- Use environment variables for secrets
- Enable CORS restrictions in production
- Use HTTPS in production
- Regularly update dependencies
- Monitor logs for security issues

## 🎉 Success!

Your Algo-Task platform is now running with full Docker support!
