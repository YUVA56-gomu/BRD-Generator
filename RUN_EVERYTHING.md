# Run Everything - Complete Commands

## One-Time Setup

### 1. Install Backend Dependencies
```bash
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Configure Backend Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/brd_generator
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Configure Frontend Environment
```bash
cd frontend
cp .env.example .env.local
cd ..
```

Edit `frontend/.env.local`:
```
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Running Everything

### Option 1: Using Docker (Recommended)

#### Start MongoDB and ChromaDB
```bash
docker-compose up -d
```

Verify services are running:
```bash
docker-compose ps
```

#### Terminal 1: Backend
```bash
npm run dev
```

Output should show:
```
Server running on port 3000
MongoDB Connected: localhost
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

Output should show:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3001
```

#### Terminal 3: Monitor Logs (Optional)
```bash
docker-compose logs -f
```

### Option 2: Without Docker (Local MongoDB)

#### Prerequisites
- MongoDB running locally on port 27017

#### Terminal 1: Backend
```bash
npm run dev
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

## Testing the Setup

### 1. Check Backend Health
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-02-12T10:30:00.000Z"
}
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

Expected response:
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@example.com",
    "name": "Test User"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Create Project
```bash
# Replace USER_ID with the id from signup/login response
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "name": "My First Project",
    "description": "Testing the API"
  }'
```

### 5. Open Frontend
Navigate to `http://localhost:3001` in your browser

## Stopping Everything

### Stop Docker Services
```bash
docker-compose down
```

### Stop Backend
Press `Ctrl+C` in Terminal 1

### Stop Frontend
Press `Ctrl+C` in Terminal 2

## Useful Commands

### View Backend Logs
```bash
npm run dev
```

### View Frontend Logs
```bash
cd frontend
npm run dev
```

### View MongoDB Logs
```bash
docker-compose logs mongodb
```

### View All Docker Logs
```bash
docker-compose logs -f
```

### Reset MongoDB Data
```bash
docker-compose down -v
docker-compose up -d
```

### Check MongoDB Connection
```bash
docker exec -it brd_mongodb mongosh
```

Then in MongoDB shell:
```javascript
db.adminCommand('ping')
// Should return: { ok: 1 }
```

### Check Running Processes
```bash
# On macOS/Linux
lsof -i :3000  # Backend
lsof -i :3001  # Frontend
lsof -i :27017 # MongoDB

# On Windows
netstat -ano | findstr :3000
netstat -ano | findstr :3001
netstat -ano | findstr :27017
```

## Development Workflow

### 1. Start Services
```bash
# Terminal 1: MongoDB
docker-compose up -d

# Terminal 2: Backend
npm run dev

# Terminal 3: Frontend
cd frontend && npm run dev
```

### 2. Make Changes
- Edit backend files in `src/`
- Edit frontend files in `frontend/`
- Changes auto-reload with nodemon and Next.js

### 3. Test Changes
- Backend: Use curl or Postman
- Frontend: Refresh browser

### 4. Check Logs
- Backend: Terminal 2
- Frontend: Terminal 3
- MongoDB: `docker-compose logs mongodb`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 27017
lsof -ti:27017 | xargs kill -9
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
docker-compose ps

# Restart MongoDB
docker-compose restart mongodb

# Check logs
docker-compose logs mongodb
```

### Frontend Can't Connect to Backend
```bash
# Check backend is running
curl http://localhost:3000/health

# Check frontend environment
cat frontend/.env.local

# Restart frontend
# Press Ctrl+C and run: cd frontend && npm run dev
```

### Dependencies Not Installed
```bash
# Backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
```

## Production Deployment

See `DEPLOYMENT.md` for production setup.

## Quick Reference

| Service | Port | Command | Status |
|---------|------|---------|--------|
| Backend | 3000 | `npm run dev` | Running |
| Frontend | 3001 | `cd frontend && npm run dev` | Running |
| MongoDB | 27017 | `docker-compose up -d` | Running |
| ChromaDB | 8000 | `docker-compose up -d` | Running |

## Next Steps

1. ✅ Start all services
2. ✅ Test API endpoints
3. ✅ Create user account
4. ✅ Create project
5. ✅ Upload document
6. ✅ Generate BRD
7. ⏭️ Deploy to production

---

**Ready to go!** Follow the commands above to get everything running.
