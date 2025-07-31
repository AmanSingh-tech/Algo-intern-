# CodeArena - Full Stack Application

A full-stack coding platform with React (Next.js) frontend and Node.js/Express backend.

## Project Structure

```
/
├── client/          # Next.js frontend
├── server/          # Express.js backend
├── Compiler/        # Code execution service
└── package.json     # Root package with scripts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (for production)

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies for root, client, and server
npm run install:all
```

### 2. Environment Setup

#### Backend (.env in /server/)
```env
DATABASE_URL="your_database_url"
JWT_PASSKEY="your_jwt_secret"
SALT_ROUNDS=10
PORT=8000
```

#### Frontend (.env.local in /client/)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 3. Start Development

```bash
# Run both frontend and backend simultaneously
npm run dev

# Or run individually:
npm run dev:server  # Backend only (port 8000)
npm run dev:client  # Frontend only (port 3000)
```

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000

## API Endpoints

### Authentication
- `POST /new/user/register` - User registration
- `POST /new/user/signin` - User login

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problem/:id` - Get specific problem

### User (Authenticated)
- `GET /user/profile` - Get user profile

### Code Execution
- `POST /evaluate/run` - Run code
- `POST /evaluate/submit` - Submit solution

### AI Features
- `POST /ai/response` - Get AI hints/assistance

## Frontend Features

- **Authentication:** Login/Register pages
- **Problem Solving:** Code editor with syntax highlighting
- **User Dashboard:** Profile and progress tracking
- **Responsive Design:** Works on desktop and mobile

## Backend Features

- **User Management:** Registration, authentication with JWT
- **Problem Management:** CRUD operations for coding problems
- **Code Execution:** Safe code execution environment
- **AI Integration:** Google Gemini AI for hints and assistance
- **Database:** Prisma ORM with PostgreSQL

## Development Notes

- Frontend uses Next.js 15 with App Router
- Backend uses Express.js with ES modules
- Authentication via JWT tokens
- CORS enabled for cross-origin requests
- All API calls centralized in `/client/lib/api.ts`

## Production Deployment

1. Build the frontend: `cd client && npm run build`
2. Start the backend: `cd server && npm start`
3. Configure environment variables for production
4. Set up database migrations with Prisma

## Troubleshooting

### Connection Issues
- Ensure backend is running on port 8000
- Check environment variables are set correctly
- Verify CORS configuration

### Database Issues
- Run `npx prisma generate` in server directory
- Run `npx prisma migrate dev` for development migrations

### Build Issues
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility
