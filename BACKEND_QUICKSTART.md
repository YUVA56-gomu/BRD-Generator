# Backend Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB running (local or Docker)
- OpenAI or Gemini API key

## 1. Setup

### Install Dependencies
```bash
npm install
```

### Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/brd_generator
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
```

### Start MongoDB
```bash
docker-compose up -d
```

## 2. Run Backend

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server runs on `http://localhost:3000`

## 3. Test API

### Health Check
```bash
curl http://localhost:3000/health
```

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Response includes JWT token - save it for authenticated requests.

### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_FROM_LOGIN",
    "name": "My First Project",
    "description": "Testing the API"
  }'
```

## 4. Connect Frontend

Update `frontend/.env.local`:
```
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Then run frontend:
```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3001`

## API Documentation

See `API_DOCUMENTATION.md` for complete endpoint reference.

## Troubleshooting

**MongoDB Connection Error**
- Check if MongoDB is running: `docker-compose ps`
- Verify `MONGODB_URI` in `.env.local`

**Port Already in Use**
- Change `PORT` in `.env.local`
- Or kill process: `lsof -ti:3000 | xargs kill -9`

**LLM API Errors**
- Verify API key is correct
- Check LLM provider is set correctly

## Next Steps

1. Review `MONGODB_MIGRATION.md` for database details
2. Check `API_DOCUMENTATION.md` for all endpoints
3. See `ARCHITECTURE.md` for system design
