# 🚀 Quick Fix Guide - Signup/Login Issues

## The Problem
Signup/Login is failing or not working

## The Solution (3 Steps)

### Step 1: Stop Everything
```bash
docker-compose down
```

### Step 2: Start Services
```bash
# Terminal 1
docker-compose up -d

# Terminal 2
npm run dev

# Terminal 3
cd frontend && npm run dev
```

### Step 3: Test
1. Go to `http://localhost:3001/login`
2. Try to login or signup
3. Should work now!

## If Still Not Working

### Check 1: Is Backend Running?
```bash
curl http://localhost:3000/health
```
Should return: `{"status":"ok"}`

If not, run: `npm run dev`

### Check 2: Is MongoDB Running?
```bash
docker-compose ps
```
Should show `brd_mongodb` as running

If not, run: `docker-compose up -d`

### Check 3: Is Frontend Running?
Go to `http://localhost:3001`
Should load the login page

If not, run: `cd frontend && npm run dev`

### Check 4: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Copy error and search for solution

### Check 5: Test API Directly
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123"
  }'
```

Should return user and token

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Cannot POST /api/auth/signup" | Start backend: `npm run dev` |
| "MongoDB connection error" | Start MongoDB: `docker-compose up -d` |
| "Invalid email or password" | Check credentials are correct |
| "Email already registered" | Use different email |
| "CORS policy error" | Clear cache, try incognito mode |
| "Network error" | Check API URL in `frontend/.env.local` |

## Environment Variables

### Backend `.env.local`
```
MONGODB_URI=mongodb://localhost:27017/brd_generator
JWT_SECRET=your-secret-key
```

### Frontend `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK_API=false
```

## Ports

- Backend: 3000
- Frontend: 3001
- MongoDB: 27017

Make sure these ports are not in use!

## Nuclear Option (Reset Everything)

```bash
# Stop everything
docker-compose down -v

# Remove frontend cache
rm -rf frontend/.next

# Start fresh
docker-compose up -d
npm install
cd frontend && npm install
npm run dev
cd frontend && npm run dev
```

## Google OAuth (Optional)

1. Get Google Client ID from [Google Cloud Console](https://console.cloud.google.com/)
2. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   ```
3. Add to `frontend/.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
   ```
4. Restart services
5. Google button should appear on login page

## Still Not Working?

1. Check all 3 services are running
2. Check all environment variables are set
3. Check browser console for errors
4. Check backend logs for errors
5. Try nuclear option above
6. Check documentation files:
   - `AUTH_TROUBLESHOOTING.md`
   - `AUTH_FLOW_GUIDE.md`
   - `GOOGLE_OAUTH_SETUP.md`

## Success Indicators

✅ Backend running on port 3000
✅ Frontend running on port 3001
✅ MongoDB running
✅ Can access `http://localhost:3001/login`
✅ Can signup with email/password
✅ Can login with email/password
✅ Redirected to dashboard after login
✅ Can logout
✅ Cannot access dashboard without login

---

**That's it!** If you follow these steps, signup/login should work!
