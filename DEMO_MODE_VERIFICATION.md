# Demo Mode Verification & Testing Guide

## ✅ Current Status: FULLY IMPLEMENTED

All demo mode features are implemented and ready to test. The system allows users to login/signup with any valid email without authentication.

---

## System Architecture

### Frontend (Next.js 14 + React 18)
- **Location**: `frontend/`
- **State Management**: Zustand with localStorage persistence
- **Authentication**: Demo mode (any email accepted)
- **API**: Mock API for local development

### Backend (Express.js + MongoDB)
- **Location**: `src/`
- **Database**: MongoDB (via Docker Compose)
- **Authentication**: JWT tokens
- **Routes**: Auth, Projects, Requirements, BRD, Ingestion

---

## Demo Mode Features

### 1. Login (Demo Mode)
**File**: `frontend/components/Auth/LoginForm.tsx`

- ✅ Accepts any valid email format
- ✅ No password required
- ✅ Auto-generates mock user object
- ✅ Generates mock JWT token
- ✅ Stores in localStorage
- ✅ Redirects to dashboard after 300ms delay

**Test Steps**:
1. Go to http://localhost:3000/login
2. Enter any email (e.g., `test@example.com`)
3. Click "Sign In"
4. Should redirect to dashboard

### 2. Signup (Demo Mode)
**File**: `frontend/components/Auth/SignupForm.tsx`

- ✅ Accepts any name and email
- ✅ No password required
- ✅ Auto-generates mock user object
- ✅ Generates mock JWT token
- ✅ Stores in localStorage
- ✅ Redirects to dashboard after 300ms delay

**Test Steps**:
1. Go to http://localhost:3000/signup
2. Enter name (e.g., `John Doe`)
3. Enter email (e.g., `john@example.com`)
4. Click "Create Account"
5. Should redirect to dashboard

### 3. Protected Routes
**File**: `frontend/components/Layout/ProtectedRoute.tsx`

- ✅ Checks for user and token in localStorage
- ✅ 100ms delay to allow state to load
- ✅ Redirects to login if not authenticated
- ✅ Shows loading spinner while checking

**Protected Pages**:
- `/dashboard` - Main dashboard
- `/projects/[id]` - Project details
- `/integrations` - Integrations page

### 4. Session Persistence
**File**: `frontend/lib/store.ts`

- ✅ Saves user to `localStorage.auth_user`
- ✅ Saves token to `localStorage.auth_token`
- ✅ Loads on app initialization
- ✅ Persists across browser restarts
- ✅ Clears on logout

### 5. Logout
**File**: `frontend/components/Layout/Header.tsx`

- ✅ Clears localStorage
- ✅ Resets Zustand store
- ✅ Redirects to login page
- ✅ Shows success toast

---

## Testing Checklist

### Basic Flow
- [ ] Navigate to http://localhost:3000
- [ ] Click "Get Started" or go to /login
- [ ] Enter email: `test@example.com`
- [ ] Click "Sign In"
- [ ] Verify redirect to dashboard
- [ ] Verify user name displayed in header
- [ ] Verify "Welcome back" message

### Signup Flow
- [ ] Go to /signup
- [ ] Enter name: `Test User`
- [ ] Enter email: `newuser@example.com`
- [ ] Click "Create Account"
- [ ] Verify redirect to dashboard
- [ ] Verify user name in header

### Session Persistence
- [ ] Login with any email
- [ ] Refresh the page (F5)
- [ ] Verify still logged in
- [ ] Verify user data still displayed
- [ ] Open browser DevTools → Application → LocalStorage
- [ ] Verify `auth_user` and `auth_token` exist

### Logout
- [ ] Click user profile icon (top right)
- [ ] Click "Logout"
- [ ] Verify redirect to login page
- [ ] Verify localStorage cleared
- [ ] Try to access /dashboard directly
- [ ] Verify redirected to login

### Protected Routes
- [ ] Login successfully
- [ ] Go to /dashboard
- [ ] Verify page loads
- [ ] Open new tab and go to /dashboard
- [ ] Verify page loads (session persists)
- [ ] Logout
- [ ] Try to access /dashboard
- [ ] Verify redirected to login

### Dashboard Features
- [ ] Verify welcome message with user name
- [ ] Verify "No projects yet" message
- [ ] Click "Create Your First Project"
- [ ] Verify modal opens
- [ ] Enter project name: `Test Project`
- [ ] Click "Create Project"
- [ ] Verify project appears in dashboard
- [ ] Verify stats section shows project count
- [ ] Verify featured slider shows project

### Multiple Users
- [ ] Login as `user1@example.com`
- [ ] Create a project
- [ ] Logout
- [ ] Login as `user2@example.com`
- [ ] Verify no projects (each user has separate session)
- [ ] Create a project
- [ ] Logout
- [ ] Login as `user1@example.com`
- [ ] Verify original project still there

---

## File Structure

```
frontend/
├── app/
│   ├── login/page.tsx              # Login page
│   ├── signup/page.tsx             # Signup page
│   ├── dashboard/page.tsx          # Dashboard (protected)
│   ├── projects/[id]/page.tsx      # Project details (protected)
│   └── layout.tsx                  # Root layout with providers
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx           # Demo mode login
│   │   ├── SignupForm.tsx          # Demo mode signup
│   │   └── GoogleLoginButton.tsx   # Google OAuth
│   ├── Layout/
│   │   ├── ProtectedRoute.tsx      # Route protection
│   │   ├── Header.tsx              # Header with logout
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   └── MainLayout.tsx          # Main layout wrapper
│   ├── Dashboard/
│   │   ├── FeaturedSlider.tsx      # Project carousel
│   │   ├── StatsSection.tsx        # Stats cards
│   │   └── QuickActions.tsx        # Action buttons
│   └── Common/
│       ├── Button.tsx              # Reusable button
│       ├── Input.tsx               # Reusable input
│       ├── Card.tsx                # Reusable card
│       ├── Alert.tsx               # Alert component
│       └── LoadingSpinner.tsx      # Loading indicator
├── lib/
│   ├── store.ts                    # Zustand store with localStorage
│   ├── api.ts                      # API client
│   └── mockApi.ts                  # Mock API for development
└── package.json
```

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### Backend (.env.local)
```
MONGODB_URI=mongodb://localhost:27017/brd-generator
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## How It Works

### Login Flow (Demo Mode)
1. User enters email on login page
2. Form validates email format
3. Creates mock user object with random ID
4. Generates mock JWT token
5. Calls `setUser()` and `setToken()` from Zustand
6. Zustand saves to localStorage
7. 300ms delay to ensure state is saved
8. Redirects to `/dashboard`

### Protected Route Flow
1. Component mounts
2. Checks localStorage for `auth_user` and `auth_token`
3. 100ms delay to allow state to load from localStorage
4. If both exist, sets `isAuthorized = true`
5. If either missing, redirects to `/login`
6. Shows loading spinner while checking

### Session Persistence Flow
1. App loads
2. Zustand store initializes
3. Checks localStorage for saved user/token
4. If found, restores to store
5. User stays logged in across page refreshes

---

## Troubleshooting

### Issue: Not redirecting to dashboard after login
**Solution**:
1. Check browser console for errors (F12)
2. Check localStorage (DevTools → Application → LocalStorage)
3. Verify `auth_user` and `auth_token` are saved
4. Try clearing cache: `Ctrl+Shift+Delete`
5. Restart dev server: `npm run dev`

### Issue: Logged out after page refresh
**Solution**:
1. Check localStorage is enabled in browser
2. Check for browser privacy mode (disables localStorage)
3. Verify store.ts is loading from localStorage on init
4. Check for console errors

### Issue: Can access protected routes without login
**Solution**:
1. Verify ProtectedRoute component is wrapping the page
2. Check that page is using `<ProtectedRoute><Content /></ProtectedRoute>`
3. Verify localStorage is being checked
4. Check browser console for errors

### Issue: Multiple users interfering with each other
**Solution**:
1. Each user should have separate localStorage
2. Logout completely before switching users
3. Use incognito/private window for separate session
4. Clear localStorage between tests

---

## Performance Notes

- **Login/Signup**: Instant (no API calls in demo mode)
- **Redirect**: 300ms delay (ensures state is saved)
- **Route Protection**: 100ms delay (allows state to load)
- **Dashboard Load**: Depends on project count (mock data)

---

## Next Steps

1. **Test the flows** using the checklist above
2. **Connect to backend** when ready (set `NEXT_PUBLIC_API_URL`)
3. **Add real authentication** when needed
4. **Implement Google OAuth** (already set up)
5. **Deploy to production** (Vercel recommended)

---

## Related Files

- **Auth Store**: `frontend/lib/store.ts`
- **Protected Route**: `frontend/components/Layout/ProtectedRoute.tsx`
- **Login Form**: `frontend/components/Auth/LoginForm.tsx`
- **Signup Form**: `frontend/components/Auth/SignupForm.tsx`
- **Header/Logout**: `frontend/components/Layout/Header.tsx`
- **API Client**: `frontend/lib/api.ts`

---

## Support

For issues or questions:
1. Check browser console (F12)
2. Check localStorage (DevTools → Application)
3. Review the files listed above
4. Check the troubleshooting section
5. Restart dev server: `npm run dev`

