# Quick Authentication Testing Guide

## Start Everything

### Terminal 1: MongoDB
```bash
docker-compose up -d
```

### Terminal 2: Backend
```bash
npm run dev
```

Wait for: `Server running on port 3000`

### Terminal 3: Frontend
```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:3001`

## Test Signup

1. Open `http://localhost:3001/signup`
2. Fill form:
   ```
   Full Name: Test User
   Email: test@example.com
   Password: password123
   Confirm: password123
   ```
3. Click "Create Account"
4. ✅ Should see success toast and redirect to dashboard

## Test Login

1. Open `http://localhost:3001/login`
2. Fill form:
   ```
   Email: test@example.com
   Password: password123
   ```
3. Click "Sign In"
4. ✅ Should see success toast and redirect to dashboard

## Test Dashboard

1. After login, you should see:
   - User name in top right
   - "Projects" heading
   - "New Project" button
   - Empty state message

## Test Logout

1. Click user profile (top right)
2. Click "Logout"
3. ✅ Should see success toast and redirect to login

## Test Protected Route

1. After logout, try to access `http://localhost:3001/dashboard`
2. ✅ Should redirect to login

## Test Session Persistence

1. Login again
2. Close browser completely
3. Reopen and go to `http://localhost:3001/dashboard`
4. ✅ Should still be logged in

## Test Error Handling

1. Try signup with:
   - Empty fields → "Please fill in all fields"
   - Password < 6 chars → "Password must be at least 6 characters"
   - Mismatched passwords → "Passwords do not match"

2. Try login with:
   - Wrong password → "Invalid email or password"
   - Non-existent email → "Invalid email or password"

## Check Browser Storage

1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Look for:
   - `auth_user` - Should contain user object
   - `auth_token` - Should contain JWT token

## Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Signup/Login and watch requests:
   - `POST /api/auth/signup` or `/api/auth/login`
   - Response should include user and token

## Troubleshooting

### "Cannot POST /api/auth/signup"
- Backend not running
- Check Terminal 2 for errors
- Run `npm run dev` in root directory

### "Failed to load projects"
- Backend not running
- MongoDB not running
- Check Terminal 1 and 2 for errors

### "Redirected to login after signup"
- Check browser console for errors
- Check localStorage is enabled
- Check auth_user and auth_token in localStorage

### "Session not persisting"
- Check localStorage keys exist
- Try clearing cache (Ctrl+Shift+Delete)
- Check browser privacy settings

## Success Indicators

✅ Signup works and redirects to dashboard
✅ Login works and redirects to dashboard
✅ User name appears in header
✅ Logout works and redirects to login
✅ Protected routes redirect to login
✅ Session persists after browser close
✅ Error messages display correctly
✅ localStorage has auth data
✅ Network requests show correct endpoints
✅ No console errors

## Next Steps

Once all tests pass:
1. Test project creation
2. Test document upload
3. Test requirement extraction
4. Test BRD generation
5. Deploy to production
