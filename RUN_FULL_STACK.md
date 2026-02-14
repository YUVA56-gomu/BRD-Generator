# Run Full Stack - Frontend + Backend

**Status**: ✅ READY  
**Date**: February 12, 2026

---

## 🚀 Quick Start (5 minutes)

### Terminal 1: Start Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```

### Terminal 2: Start Backend
```bash
npm install  # First time only
docker-compose up -d  # Start MongoDB
npm run dev
```

### Terminal 3: Open Browser
```
http://localhost:3000
```

---

## 📋 Step-by-Step Setup

### Step 1: Setup Environment Variables

Create `.env.local` in root directory:

```env
# Backend Configuration
MONGODB_URI=mongodb://localhost:27017/brd-generator
JWT_SECRET=your_jwt_secret_key_here
PORT=3000
NODE_ENV=development

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# LLM (Optional)
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### Step 2: Start MongoDB

```bash
# Start MongoDB container
docker-compose up -d

# Verify it's running
docker-compose ps

# View logs
docker-compose logs -f mongodb
```

### Step 3: Install Dependencies

```bash
# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

### Step 4: Run Migrations (Optional)

```bash
npm run migrate
```

### Step 5: Seed Database (Optional)

```bash
npm run seed
```

### Step 6: Start Backend

```bash
npm run dev
```

Expected output:
```
Server running on port 3000
Connected to MongoDB
```

### Step 7: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

### Step 8: Open Browser

Visit: **http://localhost:3000**

---

## 🧪 Test the Full Stack

### Test 1: Login
1. Go to http://localhost:3000/login
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Click "Sign In"
5. Expected: Redirect to dashboard

### Test 2: Create Project
1. Click "Create Your First Project"
2. Enter name: "Test Project"
3. Click "Create Project"
4. Expected: Project appears in dashboard

### Test 3: Check Backend
```bash
# Test health endpoint
curl http://localhost:3000/health

# Expected response:
# {"status":"ok","timestamp":"2026-02-12T..."}
```

### Test 4: Check MongoDB
```bash
# Connect to MongoDB
docker exec -it mongodb mongosh

# List databases
show dbs

# Use BRD database
use brd-generator

# List collections
show collections

# View users
db.users.find()
```

---

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│         Browser (Port 3000)              │
│  ┌───────────────────────────────────┐  │
│  │  Next.js Frontend (React 18)      │  │
│  │  - Pages: Login, Dashboard, etc.  │  │
│  │  - State: Zustand + localStorage  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓ HTTP Requests
┌─────────────────────────────────────────┐
│      Express.js Backend (Port 3000)      │
│  ┌───────────────────────────────────┐  │
│  │  Routes & Controllers             │  │
│  │  - /api/auth                      │  │
│  │  - /api/projects                  │  │
│  │  - /api/requirements              │  │
│  │  - /api/brds                      │  │
│  │  - /api/ingestion                 │  │
│  └───────────────────────────────────┘  │
│              ↓
│  ┌───────────────────────────────────┐  │
│  │  MongoDB (Port 27017)             │  │
│  │  - Users, Projects, Requirements  │  │
│  │  - Sources, BRD Documents         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 🔄 Data Flow Example

### Creating a Project

```
1. User clicks "Create Project" in frontend
   ↓
2. Frontend shows modal with form
   ↓
3. User enters project name and clicks "Create"
   ↓
4. Frontend sends: POST /api/projects
   {
     "name": "My Project",
     "description": "Test project"
   }
   ↓
5. Backend receives request
   ↓
6. Backend validates input with Joi
   ↓
7. Backend creates project in MongoDB
   ↓
8. Backend returns: 
   {
     "id": "507f1f77bcf86cd799439011",
     "name": "My Project",
     "status": "active",
     "created_at": "2026-02-12T..."
   }
   ↓
9. Frontend receives response
   ↓
10. Frontend adds to Zustand store
    ↓
11. Dashboard updates with new project
    ↓
12. User sees project in dashboard ✅
```

---

## 🛠️ Useful Commands

### Frontend Commands
```bash
cd frontend

# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Check for errors
npm run lint:fix         # Fix linting errors

# Type checking
npm run type-check       # Check TypeScript types
```

### Backend Commands
```bash
# Development
npm run dev              # Start with nodemon

# Production
npm start                # Start server

# Database
npm run migrate          # Run migrations
npm run seed             # Seed database

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode

# Linting
npm run lint             # Check for errors
npm run lint:fix         # Fix linting errors
```

### Docker Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f mongodb

# Restart services
docker-compose restart

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

---

## 📊 Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 3000 | http://localhost:3000/api |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## 🔐 Authentication Flow

### Login Process
```
1. User enters email and password
2. Frontend sends POST /api/auth/login
3. Backend validates credentials
4. Backend hashes password with bcryptjs
5. Backend generates JWT token
6. Backend returns token and user data
7. Frontend saves token to localStorage
8. Frontend redirects to dashboard
9. User logged in ✅
```

### API Requests
```
All API requests include JWT token:

Authorization: Bearer <token>

Example:
curl -H "Authorization: Bearer eyJhbGc..." \
  http://localhost:3000/api/projects
```

---

## 🐛 Troubleshooting

### Issue: Frontend can't connect to backend
**Solution**:
1. Verify backend is running: `npm run dev`
2. Check NEXT_PUBLIC_API_URL in frontend/.env.local
3. Verify backend is on http://localhost:3000
4. Check browser console for errors (F12)

### Issue: MongoDB connection failed
**Solution**:
1. Verify MongoDB is running: `docker-compose ps`
2. Check MONGODB_URI in .env.local
3. Restart MongoDB: `docker-compose restart mongodb`
4. Check MongoDB logs: `docker-compose logs mongodb`

### Issue: Port 3000 already in use
**Solution**:
```bash
# Option 1: Use different port
PORT=3001 npm run dev

# Option 2: Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: CORS error
**Solution**:
1. Verify CORS is enabled in backend
2. Check frontend URL is allowed
3. Verify Content-Type header is set
4. Check browser console for specific error

### Issue: JWT token invalid
**Solution**:
1. Verify JWT_SECRET is set in .env.local
2. Check token is being sent in Authorization header
3. Verify token hasn't expired
4. Try logging in again

---

## 📝 File Structure

```
Root/
├── src/                          # Backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   ├── db/
│   └── index.js
├── frontend/                     # Frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── tsconfig.json
├── .env.local                    # Backend env vars
├── docker-compose.yml            # MongoDB config
├── package.json                  # Backend dependencies
└── README.md
```

---

## ✅ Verification Checklist

- [ ] MongoDB is running (docker-compose ps)
- [ ] Backend is running (npm run dev)
- [ ] Frontend is running (npm run dev)
- [ ] Can access http://localhost:3000
- [ ] Can login with test@example.com
- [ ] Can create projects
- [ ] Can see projects in dashboard
- [ ] No console errors (F12)
- [ ] No network errors (DevTools → Network)
- [ ] localStorage has auth data

---

## 🎯 Next Steps

### Immediate
1. Follow the step-by-step setup above
2. Test login and project creation
3. Verify all features work

### Short Term
1. Test all API endpoints
2. Test error handling
3. Test validation
4. Test edge cases

### Medium Term
1. Implement document upload
2. Implement requirement extraction
3. Implement BRD generation
4. Add more features

### Long Term
1. Deploy to production
2. Setup monitoring
3. Add analytics
4. Scale infrastructure

---

## 📞 Support

### Quick Help
1. Check console for errors (F12)
2. Check backend logs
3. Check MongoDB logs
4. Restart services

### Detailed Help
1. Read BACKEND_SETUP_GUIDE.md
2. Read IMPLEMENTATION_SUMMARY.md
3. Read SYSTEM_OVERVIEW.md
4. Check API documentation

---

## 🎉 You're All Set!

The full stack is ready to run. Follow the quick start above and you'll have:

✅ Frontend running on http://localhost:3000
✅ Backend running on http://localhost:3000/api
✅ MongoDB running on localhost:27017
✅ Full authentication working
✅ Project management working
✅ All features functional

**Ready to start?** Follow the Quick Start section above!

---

**Status**: ✅ READY  
**Version**: 1.0.0  
**Last Updated**: February 12, 2026

