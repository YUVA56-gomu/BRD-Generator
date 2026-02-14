# Frontend-Backend Connection Guide

## Overview
This guide explains how to connect the Next.js frontend to the Node.js/MongoDB backend.

## Prerequisites
- Backend running on `http://localhost:3000`
- Frontend running on `http://localhost:3001`
- MongoDB running

## Step 1: Configure Frontend Environment

Edit `frontend/.env.local`:

```env
# Disable mock API
NEXT_PUBLIC_USE_MOCK_API=false

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Step 2: Update API Client

The frontend API client (`frontend/lib/api.ts`) automatically uses the real backend when `NEXT_PUBLIC_USE_MOCK_API=false`.

### API Client Features
- Automatic error handling
- Toast notifications for success/error
- JWT token management
- Request/response interceptors

## Step 3: Authentication Flow

### 1. User Registration
```typescript
// frontend/components/Auth/SignupForm.tsx
const response = await api.post('/auth/signup', {
  email: 'user@example.com',
  name: 'John Doe',
  password: 'password123'
});

// Response includes:
// {
//   user: { id, email, name },
//   token: 'jwt-token'
// }
```

### 2. User Login
```typescript
// frontend/components/Auth/LoginForm.tsx
const response = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
});

// Response includes:
// {
//   user: { id, email, name },
//   token: 'jwt-token'
// }
```

### 3. Store Token
The token is automatically stored in localStorage:
```typescript
localStorage.setItem('token', response.token);
```

### 4. Use Token in Requests
The API client automatically includes the token in all requests:
```typescript
// Authorization header automatically added
// Authorization: Bearer <token>
```

## Step 4: Project Management

### Create Project
```typescript
// frontend/app/dashboard/page.tsx
const response = await api.post('/projects', {
  userId: user.id,
  name: 'My Project',
  description: 'Project description'
});
```

### List Projects
```typescript
const projects = await api.get(`/projects/user/${userId}`);
```

### Get Project Details
```typescript
const project = await api.get(`/projects/${projectId}`);
```

### Update Project
```typescript
await api.put(`/projects/${projectId}`, {
  name: 'Updated Name',
  description: 'Updated description'
});
```

### Delete Project
```typescript
await api.delete(`/projects/${projectId}`);
```

## Step 5: Source Ingestion

### Upload Document
```typescript
// frontend/components/Workspace/SourcesTab.tsx
const formData = new FormData();
formData.append('file', file);
formData.append('projectId', projectId);
formData.append('sourceType', 'document');

const response = await api.post('/ingestion/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Response includes:
// {
//   source: { _id, project_id, source_type, ... },
//   requirements: [{ _id, title, description, ... }],
//   message: 'Ingested X requirements from source'
// }
```

### Paste Text
```typescript
const response = await api.post('/ingestion/upload', {
  projectId,
  sourceType: 'email',
  text: 'Email content here...'
});
```

### List Sources
```typescript
const sources = await api.get(`/ingestion/sources/${projectId}`);
```

### Delete Source
```typescript
await api.delete(`/ingestion/source/${sourceId}`);
```

## Step 6: Requirements Management

### Get Requirements
```typescript
// frontend/components/Workspace/RequirementsTab.tsx
const requirements = await api.get(`/requirements/${projectId}`);
```

### Filter by Type
```typescript
const functionalReqs = await api.get(
  `/requirements/${projectId}/type/functional`
);
```

### Update Requirement
```typescript
await api.put(`/requirements/${requirementId}`, {
  status: 'approved',
  priority: 'high'
});
```

### Delete Requirement
```typescript
await api.delete(`/requirements/${requirementId}`);
```

## Step 7: BRD Generation

### Generate BRD
```typescript
// frontend/components/Workspace/BRDEditorTab.tsx
const response = await api.post(`/brds/generate/${projectId}`);

// Response includes:
// {
//   _id: 'brd-id',
//   title: 'BRD - Project Name',
//   executive_summary: '...',
//   business_objectives: '...',
//   stakeholders: [...],
//   functional_requirements: [...],
//   non_functional_requirements: [...],
//   assumptions: [...],
//   risks: [...],
//   timeline: [...],
//   success_metrics: [...],
//   traceability_matrix: [...]
// }
```

### Get BRD
```typescript
const brd = await api.get(`/brds/${brdId}`);
```

### List BRDs
```typescript
const brds = await api.get(`/brds/project/${projectId}`);
```

### Edit BRD Section
```typescript
const response = await api.put(`/brds/${brdId}/edit`, {
  sectionName: 'executive_summary',
  editRequest: 'Add more details about the project scope'
});
```

### Delete BRD
```typescript
await api.delete(`/brds/${brdId}`);
```

## Step 8: Error Handling

The frontend automatically handles errors with toast notifications:

```typescript
try {
  const response = await api.post('/projects', data);
  // Success - toast notification shown
} catch (error) {
  // Error - toast notification shown
  // Error details available in error.response.data
}
```

## Step 9: State Management

The frontend uses Zustand stores to manage state:

```typescript
// frontend/lib/store.ts
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null })
}));

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project })
}));
```

## Step 10: Running Both Services

### Terminal 1: Backend
```bash
cd .
npm run dev
# Backend running on http://localhost:3000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:3001
```

### Terminal 3: MongoDB (if not using Docker)
```bash
mongod
```

Or use Docker:
```bash
docker-compose up -d
```

## Testing the Connection

### 1. Check Backend Health
```bash
curl http://localhost:3000/health
# Response: { "status": "ok", "timestamp": "..." }
```

### 2. Register User
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

### 3. Open Frontend
Navigate to `http://localhost:3001` and:
1. Sign up with the same credentials
2. Create a project
3. Upload a document
4. View extracted requirements
5. Generate BRD

## Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled (it does by default)
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running

### 401 Unauthorized
- Token may have expired
- User needs to login again
- Check JWT_SECRET matches between frontend and backend

### 404 Not Found
- Verify API endpoint is correct
- Check backend routes are registered
- Ensure MongoDB is running

### Connection Refused
- Backend not running on port 3000
- Check `npm run dev` output for errors
- Verify MongoDB connection

### CORS Policy Error
```
Access to XMLHttpRequest at 'http://localhost:3000/api/...' 
from origin 'http://localhost:3001' has been blocked by CORS policy
```

Solution:
- Backend CORS is already configured
- Check backend is running
- Clear browser cache

## API Response Format

All API responses follow this format:

### Success Response
```json
{
  "data": { /* response data */ },
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": { /* error details */ }
}
```

## Next Steps

1. ✅ Backend running with MongoDB
2. ✅ Frontend configured to use backend
3. ⏭️ Add authentication middleware to protected routes
4. ⏭️ Implement request validation
5. ⏭️ Add comprehensive error handling
6. ⏭️ Deploy to production

## Additional Resources

- Backend API Documentation: `API_DOCUMENTATION.md`
- MongoDB Migration Guide: `MONGODB_MIGRATION.md`
- Backend Quick Start: `BACKEND_QUICKSTART.md`
- Architecture Overview: `ARCHITECTURE.md`
