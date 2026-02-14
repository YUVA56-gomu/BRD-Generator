# 🔐 Google OAuth Setup Guide

## Overview

Google OAuth has been integrated into the authentication system. Users can now login with their Google account.

## Prerequisites

- Google account
- Access to Google Cloud Console
- Backend and frontend running

## Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name: `BRD Generator`
4. Click "Create"
5. Wait for project to be created

### Step 2: Enable Google+ API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it
4. Click "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure OAuth consent screen first:
   - Choose "External"
   - Fill in app name: `BRD Generator`
   - Add your email
   - Click "Save and Continue"
4. Back to credentials, click "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Name it: `BRD Generator Web`
7. Add Authorized redirect URIs:
   ```
   http://localhost:3001
   http://localhost:3001/login
   http://localhost:3001/signup
   http://localhost:3001/dashboard
   ```
8. Click "Create"
9. Copy the Client ID (you'll need this)

### Step 4: Configure Backend

1. Edit `.env.local` in root directory:
   ```
   GOOGLE_CLIENT_ID=your_client_id_from_step_3
   ```

2. Install dependencies:
   ```bash
   npm install google-auth-library
   ```

3. Restart backend:
   ```bash
   npm run dev
   ```

### Step 5: Configure Frontend

1. Edit `frontend/.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_from_step_3
   ```

2. Restart frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Step 6: Test Google Login

1. Go to `http://localhost:3001/login`
2. You should see a "Google" button
3. Click it
4. Sign in with your Google account
5. Should be redirected to dashboard

## How It Works

### Frontend Flow
1. User clicks "Google" button
2. Google Sign-In script loads
3. User authenticates with Google
4. Google returns ID token
5. Frontend sends token to backend
6. Backend verifies token
7. Backend creates/finds user
8. Backend returns JWT token
9. Frontend stores token and redirects to dashboard

### Backend Flow
1. Receives Google ID token from frontend
2. Verifies token with Google's servers
3. Extracts user info (email, name)
4. Finds or creates user in database
5. Generates JWT token
6. Returns user and token to frontend

## File Changes

### Backend
- `src/routes/authRoutes.js` - Added `/auth/google` endpoint
- `package.json` - Added `google-auth-library` dependency
- `.env.example` - Added `GOOGLE_CLIENT_ID`

### Frontend
- `frontend/components/Auth/GoogleLoginButton.tsx` - NEW
- `frontend/app/login/page.tsx` - Added Google button
- `frontend/app/signup/page.tsx` - Added Google button
- `frontend/app/layout.tsx` - Added Google Sign-In script
- `frontend/.env.example` - Added `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

## Troubleshooting

### Google Button Not Appearing
1. Check `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
2. Check Google Sign-In script loaded (check Network tab)
3. Refresh page
4. Check browser console for errors

### "Google Sign-In not loaded"
1. Check internet connection
2. Check Google Sign-In script is loading
3. Try incognito mode
4. Clear browser cache

### "Invalid Google token"
1. Check `GOOGLE_CLIENT_ID` in backend `.env.local`
2. Make sure it matches frontend `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
3. Check token hasn't expired
4. Try logging in again

### "Email not provided by Google"
1. Make sure you're using a Google account with email
2. Check Google account settings
3. Try a different Google account

### User Created But Can't Login
1. Check MongoDB is running
2. Check user was created: `db.users.find()`
3. Check JWT token is being generated
4. Check token is being stored in localStorage

## Production Deployment

### Update Redirect URIs

When deploying to production, update Google OAuth credentials:

1. Go to Google Cloud Console
2. Go to "APIs & Services" → "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Add production URLs:
   ```
   https://yourdomain.com
   https://yourdomain.com/login
   https://yourdomain.com/signup
   https://yourdomain.com/dashboard
   ```
5. Save changes

### Update Environment Variables

Backend `.env`:
```
GOOGLE_CLIENT_ID=your_production_client_id
```

Frontend `.env`:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_client_id
```

## Security Considerations

✅ **Implemented**:
- Token verification with Google's servers
- JWT token generation for session management
- Secure password hashing for regular users
- HTTPS recommended for production

⚠️ **Best Practices**:
- Keep `GOOGLE_CLIENT_ID` secret on backend
- Use HTTPS in production
- Rotate JWT secret regularly
- Monitor failed login attempts
- Use strong JWT secret

## API Endpoint

### POST /api/auth/google

**Request**:
```json
{
  "token": "google_id_token"
}
```

**Response (Success)**:
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@gmail.com",
    "name": "User Name"
  },
  "token": "jwt_token"
}
```

**Response (Error)**:
```json
{
  "error": "Invalid Google token"
}
```

## Testing

### Manual Testing
1. Go to login page
2. Click Google button
3. Sign in with Google account
4. Verify redirected to dashboard
5. Verify user info appears in header

### Automated Testing
```bash
# Test Google endpoint
curl -X POST http://localhost:3000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{
    "token": "valid_google_id_token"
  }'
```

## Disabling Google OAuth

If you want to disable Google OAuth:

1. Remove Google button from login/signup pages
2. Remove `GoogleLoginButton` component
3. Remove `/auth/google` endpoint from backend
4. Remove `google-auth-library` from dependencies

## Future Enhancements

- [ ] Add GitHub OAuth
- [ ] Add Microsoft OAuth
- [ ] Add Facebook OAuth
- [ ] Add social login linking
- [ ] Add profile picture from OAuth provider
- [ ] Add OAuth token refresh

## Summary

Google OAuth is now integrated! Users can:
1. Click "Google" button on login/signup
2. Sign in with their Google account
3. Automatically create account if new user
4. Be redirected to dashboard

**Status**: ✅ READY TO USE

Follow the setup steps above to enable Google OAuth!
