# 🔧 Authentication Troubleshooting & Setup Guide

## Issue: Signup/Login Failed

### Common Causes & Solutions

#### 1. Backend Not Running
**Error**: "Cannot POST /api/auth/signup" or connection refused

**Solution**:
```bash
# Check if backend is running
curl http://localhost:3000/health

# If not running, start it
npm run dev
```

#### 2. MongoDB Not Running
**Error**: "MongoDB connection error" or "Cannot connect to database"

**Solution**:
```bash
# Check if MongoDB is running
docker-compose ps

# If not running, start it
docker-compose up -d

# Verify MongoDB is running
docker-compose logs mongodb
```

#### 3. API URL Misconfigured
**Error**: "Network error" or "Failed to fetch"

**Solution**:
Check `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Make sure:
- Backend is running on port 3000
- Frontend is running on port 3001
- No typos in the URL

#### 4. CORS Issues
**Error**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution**:
Backend already has CORS enabled. If still getting error:
- Clear browser cache
- Try incognito/private mode
- Check backend logs for errors

#### 5. Invalid Credentials
**Error**: "Invalid email or password"

**Solution**:
- Make sure you're using correct email and password
- Check if user exists in database
- Try creating a new account

#### 6. Email Already Registered
**Error**: "Email already registered"

**Solution**:
- Use a different email address
- Or login with existing credentials

### Debug Steps

1. **Check Browser Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

2. **Check Backend Logs**
   - Look at Terminal 2 where backend is running
   - Check for error messages
   - Look for MongoDB connection errors

3. **Check MongoDB**
   ```bash
   docker exec -it brd_mongodb mongosh
   use brd_generator
   db.users.find()
   ```

4. **Test API Directly**
   ```bash
   # Test signup
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "name": "Test User",
       "password": "password123"
     }'

   # Test login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

## Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
4. Choose "Web application"
5. Add authorized redirect URIs:
   - `http://localhost:3001`
   - `http://localhost:3001/login`
   - `http://localhost:3001/signup`
6. Copy the Client ID

### Step 2: Configure Backend

Edit `.env.local`:
```
GOOGLE_CLIENT_ID=your_client_id_from_step_1
```

### Step 3: Configure Frontend

Edit `frontend/.env.local`:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_from_step_1
```

### Step 4: Install Dependencies

```bash
# Backend
npm install google-auth-library

# Frontend (already included)
```

### Step 5: Test Google Login

1. Go to `http://localhost:3001/login`
2. Click "Google" button
3. Sign in with your Google account
4. Should be redirected to dashboard

## Complete Setup Checklist

### Backend Setup
- [ ] MongoDB running (`docker-compose up -d`)
- [ ] Backend running (`npm run dev`)
- [ ] Backend listening on port 3000
- [ ] `.env.local` configured with:
  - `MONGODB_URI=mongodb://localhost:27017/brd_generator`
  - `JWT_SECRET=your-secret-key`
  - `GOOGLE_CLIENT_ID=your-google-client-id` (optional)

### Frontend Setup
- [ ] Frontend running (`cd frontend && npm run dev`)
- [ ] Frontend listening on port 3001
- [ ] `frontend/.env.local` configured with:
  - `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id` (optional)

### Testing
- [ ] Can access `http://localhost:3001/login`
- [ ] Can access `http://localhost:3001/signup`
- [ ] Can signup with email/password
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Can access dashboard after login
- [ ] Cannot access dashboard without login
- [ ] Google login button appears
- [ ] Can login with Google (if configured)

## Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot POST /api/auth/signup" | Backend not running | Start backend with `npm run dev` |
| "MongoDB connection error" | MongoDB not running | Start with `docker-compose up -d` |
| "Invalid email or password" | Wrong credentials | Check email and password |
| "Email already registered" | User exists | Use different email or login |
| "CORS policy error" | CORS not enabled | Clear cache, try incognito mode |
| "Network error" | API URL wrong | Check `NEXT_PUBLIC_API_URL` |
| "Google login failed" | Google not configured | Set `GOOGLE_CLIENT_ID` |
| "Invalid Google token" | Token verification failed | Check `GOOGLE_CLIENT_ID` matches |

## Performance Tips

1. **Clear Browser Cache**
   - Ctrl+Shift+Delete (Windows)
   - Cmd+Shift+Delete (Mac)

2. **Restart Services**
   ```bash
   # Stop all services
   docker-compose down
   
   # Start fresh
   docker-compose up -d
   npm run dev
   cd frontend && npm run dev
   ```

3. **Check Logs**
   - Backend: Terminal 2
   - Frontend: Terminal 3
   - MongoDB: `docker-compose logs mongodb`

4. **Use Incognito Mode**
   - Helps avoid cache issues
   - Fresh session each time

## Advanced Debugging

### Enable Verbose Logging

Edit `frontend/lib/api.ts` to see all API calls:
```typescript
// Already added in updated version
console.error('API Error:', {
  status: error.response?.status,
  data: error.response?.data,
  message: error.message,
  url: error.config?.url,
});
```

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Look for POST requests to `/api/auth/login`
5. Check response status and body

### Check localStorage

1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Look for:
   - `auth_user` - Should contain user object
   - `auth_token` - Should contain JWT token

## Getting Help

If you're still having issues:

1. **Check the logs**
   - Backend logs in Terminal 2
   - Frontend logs in Terminal 3
   - Browser console (F12)

2. **Verify configuration**
   - Check `.env.local` files
   - Check API URL is correct
   - Check ports are correct

3. **Test API directly**
   - Use curl commands above
   - Verify backend responds

4. **Try fresh start**
   ```bash
   # Stop everything
   docker-compose down
   
   # Clear cache
   rm -rf frontend/.next
   
   # Start fresh
   docker-compose up -d
   npm run dev
   cd frontend && npm run dev
   ```

## Summary

**Common Issues**:
1. Backend not running → Start with `npm run dev`
2. MongoDB not running → Start with `docker-compose up -d`
3. Wrong API URL → Check `NEXT_PUBLIC_API_URL`
4. CORS errors → Clear cache, try incognito
5. Google login not working → Set `GOOGLE_CLIENT_ID`

**Quick Fix**:
```bash
# Terminal 1
docker-compose down && docker-compose up -d

# Terminal 2
npm run dev

# Terminal 3
cd frontend && npm run dev
```

Then try logging in again!
