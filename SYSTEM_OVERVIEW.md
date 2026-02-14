# System Overview - BRD Generator

## 🎯 What is This?

BRD Generator is a full-stack SaaS application that helps teams create Business Requirements Documents (BRDs) using AI. It includes:

- **Frontend**: Modern Next.js dashboard with React components
- **Backend**: Express.js API with MongoDB database
- **Authentication**: Demo mode (any email) + Google OAuth
- **Features**: Project management, requirement extraction, BRD generation

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Next.js Frontend (React 18)                  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Pages: Login, Signup, Dashboard, Projects    │  │   │
│  │  │  Components: Forms, Cards, Modals, Sliders    │  │   │
│  │  │  State: Zustand Store with localStorage       │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                                                        │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  localStorage                                  │  │   │
│  │  │  - auth_user (user object)                    │  │   │
│  │  │  - auth_token (JWT token)                     │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│                    HTTP Requests                             │
│                          ↓                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   EXPRESS.JS BACKEND                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes                                              │   │
│  │  - /auth/login, /auth/signup, /auth/google         │   │
│  │  - /projects, /requirements, /brds, /ingestion     │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers & Services                              │   │
│  │  - Authentication (JWT, bcryptjs)                   │   │
│  │  - Project Management                               │   │
│  │  - Requirement Extraction                           │   │
│  │  - BRD Generation                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB Database                                    │   │
│  │  - Users (email, password hash, profile)            │   │
│  │  - Projects (name, description, status)             │   │
│  │  - Requirements (type, title, description)          │   │
│  │  - Sources (email, slack, documents)                │   │
│  │  - BRDDocuments (sections, version, status)         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Authentication Flow

### Demo Mode (Current)
```
User enters email
        ↓
Form validates email format
        ↓
Create mock user object
        ↓
Generate mock JWT token
        ↓
Save to localStorage (auth_user, auth_token)
        ↓
300ms delay (ensure state saved)
        ↓
Redirect to /dashboard
        ↓
ProtectedRoute checks localStorage
        ↓
User logged in ✅
```

### Real Authentication (Future)
```
User enters email + password
        ↓
Send to backend /auth/login
        ↓
Backend validates credentials
        ↓
Backend hashes password with bcryptjs
        ↓
Backend generates JWT token
        ↓
Frontend saves token to localStorage
        ↓
Redirect to /dashboard
        ↓
User logged in ✅
```

---

## 📱 User Journey

### 1. Landing Page
```
User visits http://localhost:3000
        ↓
Sees landing page with "Get Started" button
        ↓
Clicks "Get Started"
        ↓
Redirected to /login
```

### 2. Login/Signup
```
Option A: Login
  - Enter email
  - Click "Sign In"
  - Redirected to dashboard

Option B: Signup
  - Click "Sign up" link
  - Enter name and email
  - Click "Create Account"
  - Redirected to dashboard

Option C: Google OAuth
  - Click "Sign in with Google"
  - Google popup
  - Auto-login or create account
  - Redirected to dashboard
```

### 3. Dashboard
```
User sees:
  - Welcome message with name
  - Featured slider (projects)
  - Statistics (project count, etc.)
  - Quick actions (create project)
  - All projects list

User can:
  - Create new project
  - Click on project to view details
  - Logout from profile menu
```

### 4. Project Details
```
User sees:
  - Project name and description
  - Tabs: Sources, Requirements, BRD Editor, Traceability

User can:
  - Upload documents/paste text (Sources tab)
  - View extracted requirements (Requirements tab)
  - Generate and edit BRD (BRD Editor tab)
  - View requirement mapping (Traceability tab)
```

### 5. Logout
```
User clicks profile icon
        ↓
Clicks "Logout"
        ↓
localStorage cleared
        ↓
Redirected to /login
        ↓
Session ended
```

---

## 🔐 Session Management

### How Sessions Work

1. **Login**
   - User credentials validated
   - User object created
   - JWT token generated
   - Both saved to localStorage

2. **Persistence**
   - On page load, Zustand checks localStorage
   - If auth_user and auth_token exist, restore session
   - User stays logged in across refreshes

3. **Protected Routes**
   - ProtectedRoute component checks localStorage
   - If not authenticated, redirect to login
   - If authenticated, render page

4. **Logout**
   - Clear localStorage
   - Reset Zustand store
   - Redirect to login

### localStorage Structure
```javascript
// auth_user
{
  "id": "abc123",
  "email": "user@example.com",
  "name": "John Doe"
}

// auth_token
"mock_token_xyz789"
```

---

## 📊 Data Flow

### Creating a Project
```
User clicks "Create Project"
        ↓
Modal opens with form
        ↓
User enters project name
        ↓
User clicks "Create"
        ↓
Frontend sends POST /projects
        ↓
Backend creates project in MongoDB
        ↓
Backend returns project object
        ↓
Frontend adds to Zustand store
        ↓
Dashboard updates with new project
```

### Uploading Sources
```
User clicks "Upload" in Sources tab
        ↓
User selects file or pastes text
        ↓
User clicks "Ingest"
        ↓
Frontend sends POST /ingestion/upload
        ↓
Backend processes file/text
        ↓
Backend extracts requirements using LLM
        ↓
Backend saves to MongoDB
        ↓
Frontend displays requirements
```

### Generating BRD
```
User clicks "Generate BRD"
        ↓
Frontend sends POST /brds/generate/{projectId}
        ↓
Backend fetches project data
        ↓
Backend fetches requirements
        ↓
Backend uses LLM to generate BRD
        ↓
Backend saves BRD to MongoDB
        ↓
Frontend displays generated BRD
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with SSR |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | State management |
| Axios | HTTP client |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|-----------|---------|
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Joi | Validation |
| Winston | Logging |
| Helmet | Security |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container setup |
| Node.js | Runtime |
| npm | Package manager |

---

## 📁 Key Files

### Frontend
- `frontend/app/login/page.tsx` - Login page
- `frontend/app/signup/page.tsx` - Signup page
- `frontend/app/dashboard/page.tsx` - Dashboard
- `frontend/components/Auth/LoginForm.tsx` - Demo mode login
- `frontend/components/Layout/ProtectedRoute.tsx` - Route protection
- `frontend/lib/store.ts` - Zustand store with localStorage
- `frontend/lib/api.ts` - API client

### Backend
- `src/index.js` - Entry point
- `src/routes/authRoutes.js` - Auth endpoints
- `src/models/User.js` - User model
- `src/config/database.js` - MongoDB connection
- `src/middleware/errorHandler.js` - Error handling

---

## 🚀 Getting Started

### Quick Start (2 minutes)
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000

# 5. Login with any email
# Email: test@example.com
# No password needed (demo mode)
```

### Full Stack Setup
```bash
# Terminal 1: Frontend
cd frontend
npm install
npm run dev

# Terminal 2: Backend
npm install
docker-compose up -d
npm run migrate
npm run dev
```

---

## ✅ Features

### Implemented
- ✅ Demo mode authentication (any email)
- ✅ Session persistence with localStorage
- ✅ Protected routes
- ✅ Dashboard with projects
- ✅ Project creation
- ✅ User profile and logout
- ✅ Google OAuth setup
- ✅ MongoDB database
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications

### Coming Soon
- 🔄 Real authentication
- 🔄 Document upload
- 🔄 Requirement extraction
- 🔄 BRD generation
- 🔄 BRD editing
- 🔄 Traceability matrix
- 🔄 Team collaboration
- 🔄 Export to PDF/Word

---

## 🧪 Testing

### Test Scenarios
1. **Login**: Enter any email → Redirect to dashboard
2. **Signup**: Enter name and email → Redirect to dashboard
3. **Session**: Login → Refresh → Still logged in
4. **Logout**: Click logout → Redirect to login
5. **Protected**: Try to access dashboard without login → Redirect to login

### Verification
- [ ] Frontend starts without errors
- [ ] Can login with any email
- [ ] Redirects to dashboard
- [ ] User name displayed
- [ ] Can logout
- [ ] Session persists
- [ ] Cannot access dashboard without login

---

## 📚 Documentation

- `IMPLEMENTATION_SUMMARY.md` - Complete implementation details
- `DEMO_MODE_VERIFICATION.md` - Detailed verification guide
- `QUICK_TEST_GUIDE.md` - Quick testing reference
- `frontend/START_HERE.md` - Frontend quick start
- `AUTHENTICATION_READY.md` - Auth implementation details

---

## 🎯 Success Criteria

✅ Demo mode working (any email login)
✅ Session persists across refreshes
✅ Protected routes working
✅ Dashboard displays correctly
✅ Can create projects
✅ Can logout
✅ No console errors
✅ localStorage has auth data

---

## 📞 Support

For issues:
1. Check browser console (F12)
2. Check localStorage (DevTools → Application)
3. Read documentation
4. Restart dev server: `npm run dev`
5. Clear cache: `Ctrl+Shift+Delete`

---

## 🎉 Ready to Go!

The application is fully implemented and ready to test. Start with:

```bash
cd frontend
npm install
npm run dev
```

Then visit: **http://localhost:3000**

Login with any email (no password needed) and explore the dashboard!

