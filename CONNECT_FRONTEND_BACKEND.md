# 🔗 Connect Frontend to Backend - Complete Guide

## ✅ What Was Done

1. **Frontend API Client** - Updated to use real backend
2. **Error Handling** - Added comprehensive error alerts
3. **Interactive Features** - Added loading states, toast notifications, error messages
4. **Real Data Flow** - Frontend now fetches from backend

---

## 🚀 Run Both Frontend & Backend

### Terminal 1: Start Backend
```bash
cd backend
npm install
cp .env.example .env
docker-compose up -d
npm run migrate
npm run dev
```

Backend runs on: **http://localhost:3000**

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:3001**

### Terminal 3: Open Browser
Go to: **http://localhost:3001**

---

## 🎯 Complete Workflow

### 1. Sign Up
- Click "Get Started"
- Enter email, name, password
- Click "Create Account"
- Redirects to dashboard

### 2. Create Project
- Click "New Project"
- Enter project name and description
- Click "Create Project"
- Project appears in dashboard

### 3. Upload Data
- Click on project
- Go to "Sources" tab
- Upload document OR paste text
- Select source type (email, Slack, etc.)
- Click "Ingest Content"
- Requirements extracted automatically

### 4. View Requirements
- Go to "Requirements" tab
- See all extracted requirements
- Filter by type (functional, non-functional, etc.)
- View requirement details

### 5. Generate BRD
- Go to "BRD Editor" tab
- Click "Generate BRD"
- Wait for generation (shows loading)
- View complete BRD with all sections

### 6. Edit BRD
- Select section to edit
- Enter edit request (e.g., "Make it more concise")
- Click "Apply Edit"
- Section regenerated with changes

### 7. View Traceability
- Go to "Traceability" tab
- See requirement mapping table
- View requirement types and status

---

## 🎨 Interactive Features Added

### Loading States
- ✅ Buttons show loading spinner
- ✅ Disabled during operations
- ✅ Clear feedback to user

### Error Handling
- ✅ Error alerts displayed
- ✅ Toast notifications
- ✅ User-friendly messages
- ✅ Validation before submission

### Real-time Updates
- ✅ Data refreshes after operations
- ✅ Projects list updates
- ✅ Requirements load automatically
- ✅ BRD displays after generation

### User Feedback
- ✅ Success messages
- ✅ Error messages
- ✅ Loading indicators
- ✅ Empty state messages

---

## 📝 Environment Configuration

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=BRD Generator
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_USE_MOCK_API=false
```

### Backend (.env)
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=brd_generator
DB_USER=postgres
DB_PASSWORD=postgres
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
```

---

## 🔄 Data Flow

```
Frontend (Next.js)
    ↓ HTTP Request
Backend (Express.js)
    ├── PostgreSQL (store data)
    ├── LLM API (process requirements)
    └── ChromaDB (vector storage)
    ↓ HTTP Response
Frontend (Display data)
```

---

## ✨ Features Working

### Authentication
- ✅ Sign up with validation
- ✅ Login with error handling
- ✅ Token-based auth
- ✅ Protected routes

### Projects
- ✅ Create projects
- ✅ List projects
- ✅ Update projects
- ✅ Delete projects

### Data Ingestion
- ✅ Upload documents
- ✅ Paste text content
- ✅ Multiple source types
- ✅ Delete sources

### Requirements
- ✅ Extract requirements
- ✅ Filter by type
- ✅ View details
- ✅ Update status

### BRD Generation
- ✅ Generate BRD
- ✅ View sections
- ✅ Edit sections
- ✅ Regenerate BRD

### Traceability
- ✅ View requirement matrix
- ✅ Track sources
- ✅ View status

---

## 🐛 Troubleshooting

### Backend Not Connecting
1. Check backend is running: `http://localhost:3000/health`
2. Check `.env.local` has correct API URL
3. Check CORS is enabled on backend
4. Check network tab in browser DevTools

### Port Already in Use
```bash
# Frontend on different port
npm run dev -- -p 3001

# Backend on different port
npm run dev -- --port 3001
```

### Database Connection Error
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart services
docker-compose down
docker-compose up -d
```

### LLM API Error
- Check OPENAI_API_KEY in backend .env
- Verify API key is valid
- Check rate limits

---

## 📊 API Endpoints Used

### Authentication
- POST /auth/login
- POST /auth/signup

### Projects
- GET /projects/user/:userId
- POST /projects
- GET /projects/:projectId
- PUT /projects/:projectId
- DELETE /projects/:projectId

### Ingestion
- POST /ingestion/upload
- GET /ingestion/sources/:projectId
- DELETE /ingestion/source/:sourceId

### Requirements
- GET /requirements/:projectId
- GET /requirements/:projectId/type/:type
- PUT /requirements/:requirementId
- DELETE /requirements/:requirementId

### BRD
- POST /brds/generate/:projectId
- GET /brds/:brdId
- GET /brds/project/:projectId
- PUT /brds/:brdId/edit
- DELETE /brds/:brdId

---

## 🎉 Ready to Use!

Both frontend and backend are now connected and ready to use together.

**Start both servers and enjoy the full application! 🚀**

---

## 📚 Documentation

- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- API: `backend/API_DOCUMENTATION.md`
- Examples: `backend/EXAMPLES.md`

---

**Everything is connected! Start building! 💪**
