# MongoDB Migration Guide

## Overview
The backend has been successfully migrated from PostgreSQL to MongoDB. This document outlines the changes made and how to set up and run the application.

## Changes Made

### 1. Database Configuration
- **Old**: PostgreSQL with `pg` driver
- **New**: MongoDB with Mongoose ODM
- **File**: `src/config/database.js` - Now uses Mongoose connection

### 2. Models
All data models have been converted to Mongoose schemas:
- `src/models/User.js` - User authentication with bcryptjs password hashing
- `src/models/Project.js` - Project management
- `src/models/Source.js` - Document/text sources
- `src/models/Requirement.js` - Extracted requirements
- `src/models/BRDDocument.js` - Generated BRD documents

### 3. Services
All services have been updated to use Mongoose instead of SQL queries:
- `src/services/projectService.js` - Project CRUD operations
- `src/services/ingestionService.js` - Source storage and retrieval
- `src/services/requirementService.js` - Requirement extraction and management
- `src/services/brdService.js` - BRD generation and editing

### 4. Controllers
- `src/controllers/ingestionController.js` - Updated to use `source._id` instead of `source.id`
- Other controllers work seamlessly with Mongoose responses

### 5. Authentication
- New auth routes in `src/routes/authRoutes.js`
- JWT-based authentication with bcryptjs password hashing
- Endpoints: `/api/auth/login` and `/api/auth/signup`

### 6. Environment Configuration
- **File**: `.env.example` - Updated with MongoDB URI
- **Old**: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- **New**: `MONGODB_URI=mongodb://localhost:27017/brd_generator`

### 7. Docker Compose
- **File**: `docker-compose.yml` - Replaced PostgreSQL with MongoDB
- MongoDB service with health checks
- ChromaDB service remains unchanged

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

Update `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/brd_generator
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-key
```

### 3. Start MongoDB
Option A: Using Docker Compose
```bash
docker-compose up -d
```

Option B: Local MongoDB
Ensure MongoDB is running on `localhost:27017`

### 4. Run the Backend
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects/:projectId` - Get project
- `GET /api/projects/user/:userId` - List user projects
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

### Ingestion
- `POST /api/ingestion/upload` - Upload document/text
- `GET /api/ingestion/sources/:projectId` - Get project sources
- `GET /api/ingestion/source/:sourceId` - Get source details
- `DELETE /api/ingestion/source/:sourceId` - Delete source

### Requirements
- `GET /api/requirements/:projectId` - Get project requirements
- `GET /api/requirements/:projectId/type/:type` - Get requirements by type
- `PUT /api/requirements/:requirementId` - Update requirement
- `DELETE /api/requirements/:requirementId` - Delete requirement

### BRD Documents
- `POST /api/brds/generate/:projectId` - Generate BRD
- `GET /api/brds/:brdId` - Get BRD
- `GET /api/brds/project/:projectId` - Get project BRDs
- `PUT /api/brds/:brdId/edit` - Edit BRD section
- `DELETE /api/brds/:brdId` - Delete BRD

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  name: String,
  description: String,
  status: String (active|completed|archived),
  createdAt: Date,
  updatedAt: Date
}
```

### Sources Collection
```javascript
{
  _id: ObjectId,
  project_id: ObjectId (ref: Project),
  source_type: String (email|slack|meeting_transcript|document|other),
  source_text: String,
  file_name: String,
  file_path: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Requirements Collection
```javascript
{
  _id: ObjectId,
  project_id: ObjectId (ref: Project),
  requirement_type: String (functional|non_functional|stakeholder|decision|risk|timeline),
  title: String,
  description: String,
  source_id: ObjectId (ref: Source),
  priority: String (low|medium|high|critical),
  status: String (draft|approved|rejected),
  createdAt: Date,
  updatedAt: Date
}
```

### BRD Documents Collection
```javascript
{
  _id: ObjectId,
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
  traceability_matrix: [{
    id: String,
    type: String,
    title: String,
    source: String,
    status: String
  }],
  version: Number,
  status: String (draft|approved|published),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features

### Authentication
- User registration with email validation
- Password hashing with bcryptjs (10 salt rounds)
- JWT token generation (7 days expiry by default)
- Secure password comparison

### Data Relationships
- Users have many Projects
- Projects have many Sources and Requirements
- Sources have many Requirements
- Projects have many BRD Documents

### Automatic Timestamps
- All documents have `createdAt` and `updatedAt` timestamps
- Automatically managed by Mongoose

## Testing the API

### 1. Register User
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 3. Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_FROM_LOGIN",
    "name": "My Project",
    "description": "Project description"
  }'
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `docker-compose up -d`
- Check `MONGODB_URI` in `.env.local`
- Verify MongoDB is accessible on port 27017

### JWT Errors
- Ensure `JWT_SECRET` is set in `.env.local`
- Check token expiry time

### LLM API Errors
- Verify `OPENAI_API_KEY` or `GEMINI_API_KEY` is set
- Check LLM provider configuration in `src/config/llm.js`

## Migration from PostgreSQL

If you have existing PostgreSQL data:
1. Export data from PostgreSQL
2. Transform to MongoDB document format
3. Import using MongoDB tools or custom migration script
4. Verify data integrity

## Next Steps

1. Connect frontend to backend API
2. Implement authentication middleware
3. Add request validation
4. Set up comprehensive error handling
5. Add logging and monitoring
6. Deploy to production environment
