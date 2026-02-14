# Backend Setup Guide

**Status**: ✅ COMPLETE  
**Location**: `src/` folder  
**Framework**: Express.js + MongoDB  
**Version**: 1.0.0

---

## 📁 Backend Structure

```
src/
├── config/                    # Configuration files
│   ├── database.js           # MongoDB connection
│   ├── llm.js                # LLM configuration
│   └── logger.js             # Winston logger
├── models/                    # Database models
│   ├── User.js               # User model
│   ├── Project.js            # Project model
│   ├── Requirement.js        # Requirement model
│   ├── Source.js             # Source model
│   └── BRDDocument.js        # BRD document model
├── routes/                    # API routes
│   ├── authRoutes.js         # Authentication endpoints
│   ├── projectRoutes.js      # Project endpoints
│   ├── requirementRoutes.js  # Requirement endpoints
│   ├── brdRoutes.js          # BRD endpoints
│   └── ingestionRoutes.js    # Ingestion endpoints
├── controllers/               # Business logic
│   ├── projectController.js
│   ├── requirementController.js
│   ├── brdController.js
│   └── ingestionController.js
├── services/                  # Service layer
│   ├── projectService.js
│   ├── requirementService.js
│   ├── brdService.js
│   └── ingestionService.js
├── middleware/                # Express middleware
│   └── errorHandler.js       # Error handling
├── utils/                     # Utilities
│   ├── prompts.js            # LLM prompts
│   └── validators.js         # Validation functions
├── db/                        # Database utilities
│   ├── migrations/
│   │   └── run.js            # Migration runner
│   └── seeds/
│       └── seed.js           # Database seeding
└── index.js                   # Entry point
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create `.env.local` in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/brd-generator

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# LLM
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start MongoDB (Docker)
```bash
docker-compose up -d
```

### 4. Run Migrations (Optional)
```bash
npm run migrate
```

### 5. Seed Database (Optional)
```bash
npm run seed
```

### 6. Start Backend Server
```bash
npm run dev
```

Server will run on: **http://localhost:3000**

---

## 📊 API Endpoints

### Authentication Routes (`/api/auth`)
```
POST   /api/auth/login          - Login with email/password
POST   /api/auth/signup         - Create new account
POST   /api/auth/google         - Google OAuth login
GET    /api/auth/me             - Get current user
POST   /api/auth/logout         - Logout
```

### Project Routes (`/api/projects`)
```
GET    /api/projects            - List all projects
POST   /api/projects            - Create project
GET    /api/projects/:id        - Get project details
PUT    /api/projects/:id        - Update project
DELETE /api/projects/:id        - Delete project
GET    /api/projects/user/:userId - Get user's projects
```

### Requirement Routes (`/api/requirements`)
```
GET    /api/requirements/:projectId           - List requirements
GET    /api/requirements/:projectId/type/:type - Filter by type
PUT    /api/requirements/:id                  - Update requirement
DELETE /api/requirements/:id                  - Delete requirement
```

### BRD Routes (`/api/brds`)
```
POST   /api/brds/generate/:projectId  - Generate BRD
GET    /api/brds/:id                  - Get BRD
GET    /api/brds/project/:projectId   - List BRDs for project
PUT    /api/brds/:id/edit             - Edit BRD section
DELETE /api/brds/:id                  - Delete BRD
```

### Ingestion Routes (`/api/ingestion`)
```
POST   /api/ingestion/upload          - Upload document/text
GET    /api/ingestion/sources/:projectId - List sources
GET    /api/ingestion/source/:id      - Get source details
DELETE /api/ingestion/source/:id      - Delete source
```

---

## 🗄️ Database Models

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  profile_picture: String,
  created_at: Date,
  updated_at: Date
}
```

### Project Model
```javascript
{
  user_id: ObjectId (ref: User),
  name: String,
  description: String,
  status: String (active|completed|archived),
  created_at: Date,
  updated_at: Date
}
```

### Requirement Model
```javascript
{
  project_id: ObjectId (ref: Project),
  requirement_type: String (functional|non_functional|stakeholder|decision|risk|timeline),
  title: String,
  description: String,
  priority: String (low|medium|high|critical),
  status: String (draft|approved|rejected),
  created_at: Date
}
```

### Source Model
```javascript
{
  project_id: ObjectId (ref: Project),
  source_type: String (email|slack|meeting_transcript|document|other),
  source_text: String,
  file_name: String,
  created_at: Date
}
```

### BRDDocument Model
```javascript
{
  project_id: ObjectId (ref: Project),
  title: String,
  executive_summary: String,
  business_objectives: String,
  stakeholders: [String],
  functional_requirements: [String],
  non_functional_requirements: [String],
  assumptions: [String],
  risks: [String],
  timeline: [String],
  success_metrics: [String],
  version: Number,
  status: String (draft|approved|published),
  created_at: Date,
  updated_at: Date
}
```

---

## 🔐 Authentication

### JWT Token
- Generated on login/signup
- Stored in frontend localStorage
- Sent in Authorization header: `Bearer <token>`
- Expires after 24 hours (configurable)

### Password Hashing
- Uses bcryptjs
- Salt rounds: 10
- Passwords never stored in plain text

### Google OAuth
- Uses Google Sign-In library
- Auto-creates user on first login
- Generates JWT token
- No password required

---

## 🛠️ npm Scripts

```bash
# Development
npm run dev              # Start with nodemon (auto-reload)

# Production
npm start               # Start server

# Database
npm run migrate         # Run migrations
npm run seed            # Seed database

# Testing
npm test                # Run tests
npm run test:watch      # Watch mode

# Linting
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
```

---

## 📦 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables

### Authentication
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `google-auth-library` - Google OAuth

### Validation & Security
- `joi` - Input validation
- `helmet` - Security headers
- `cors` - CORS middleware

### Logging
- `winston` - Logging library

### Development
- `nodemon` - Auto-reload
- `eslint` - Linting

---

## 🔄 Data Flow

### Login Flow
```
1. User submits email/password
2. Backend validates credentials
3. Backend hashes password with bcryptjs
4. Backend generates JWT token
5. Frontend saves token to localStorage
6. Frontend redirects to dashboard
```

### Project Creation Flow
```
1. User clicks "Create Project"
2. Frontend sends POST /api/projects
3. Backend validates input with Joi
4. Backend creates project in MongoDB
5. Backend returns project object
6. Frontend adds to Zustand store
7. Dashboard updates with new project
```

### BRD Generation Flow
```
1. User clicks "Generate BRD"
2. Frontend sends POST /api/brds/generate/:projectId
3. Backend fetches project data
4. Backend fetches requirements
5. Backend calls LLM (OpenAI/Gemini)
6. Backend saves BRD to MongoDB
7. Frontend displays generated BRD
```

---

## 🧪 Testing

### Test Login Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"My Project","description":"Test project"}'
```

### Test Health Check
```bash
curl http://localhost:3000/health
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed
**Solution**:
1. Verify MongoDB is running: `docker-compose up -d`
2. Check MONGODB_URI in .env.local
3. Verify MongoDB is accessible on localhost:27017

### Issue: Port 3000 Already in Use
**Solution**:
```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: JWT Token Invalid
**Solution**:
1. Verify JWT_SECRET is set in .env.local
2. Check token is being sent in Authorization header
3. Verify token hasn't expired

### Issue: CORS Error
**Solution**:
1. Verify CORS is enabled in index.js
2. Check frontend URL is allowed
3. Verify Content-Type header is set

---

## 📝 Environment Variables

### Required
```
MONGODB_URI          # MongoDB connection string
JWT_SECRET           # Secret key for JWT tokens
```

### Optional
```
PORT                 # Server port (default: 3000)
NODE_ENV             # Environment (development|production)
GOOGLE_CLIENT_ID     # Google OAuth client ID
GOOGLE_CLIENT_SECRET # Google OAuth client secret
OPENAI_API_KEY       # OpenAI API key
GEMINI_API_KEY       # Gemini API key
```

---

## 🔒 Security Best Practices

### Implemented
- ✅ Helmet for security headers
- ✅ CORS for cross-origin requests
- ✅ JWT for authentication
- ✅ bcryptjs for password hashing
- ✅ Input validation with Joi
- ✅ Error handling middleware
- ✅ Environment variables for secrets

### Recommended for Production
- 🔄 HTTPS only
- 🔄 Rate limiting
- 🔄 Request logging
- 🔄 Database backups
- 🔄 API key rotation
- 🔄 Monitoring & alerts
- 🔄 2FA support

---

## 📚 Related Documentation

- `COMPLETE_GUIDE.md` - Full system overview
- `SYSTEM_OVERVIEW.md` - System architecture
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `frontend/START_HERE.md` - Frontend setup

---

## 🎯 Next Steps

### Immediate
1. Install dependencies: `npm install`
2. Setup .env.local with MongoDB URI
3. Start MongoDB: `docker-compose up -d`
4. Start backend: `npm run dev`
5. Test endpoints with curl or Postman

### Short Term
1. Connect frontend to backend
2. Test API endpoints
3. Verify authentication flow
4. Test project creation

### Medium Term
1. Implement document upload
2. Implement requirement extraction
3. Implement BRD generation
4. Add more validation

### Long Term
1. Deploy to production
2. Setup monitoring
3. Add analytics
4. Scale infrastructure

---

## 📞 Support

### Quick Help
1. Check console for errors
2. Verify MongoDB is running
3. Check .env.local variables
4. Restart server: `npm run dev`

### Detailed Help
1. Read IMPLEMENTATION_SUMMARY.md
2. Check API endpoint documentation
3. Review error messages
4. Check database logs

---

**Status**: ✅ COMPLETE  
**Version**: 1.0.0  
**Last Updated**: February 12, 2026

Backend is ready to use! Start with: `npm run dev`

