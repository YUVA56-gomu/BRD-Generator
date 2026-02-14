# Quick Test Guide - Demo Mode

## 🚀 Quick Start (2 Minutes)

### Step 1: Start Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```

### Step 2: Open Browser
Go to: **http://localhost:3000**

### Step 3: Test Login
1. Click "Get Started" or go to `/login`
2. Enter email: `test@example.com`
3. Click "Sign In"
4. ✅ Should redirect to dashboard

---

## 🧪 Test Scenarios

### Scenario 1: Basic Login
```
Email: test@example.com
Expected: Redirect to dashboard, see "Welcome back" message
```

### Scenario 2: Signup
```
Name: John Doe
Email: john@example.com
Expected: Redirect to dashboard, see "Welcome back, John" message
```

### Scenario 3: Session Persistence
```
1. Login with any email
2. Refresh page (F5)
3. Expected: Still logged in, user data visible
```

### Scenario 4: Logout
```
1. Login with any email
2. Click profile icon (top right)
3. Click "Logout"
4. Expected: Redirect to login, localStorage cleared
```

### Scenario 5: Protected Routes
```
1. Logout
2. Try to access http://localhost:3000/dashboard directly
3. Expected: Redirect to login page
```

### Scenario 6: Create Project
```
1. Login
2. Click "Create Your First Project"
3. Enter name: "Test Project"
4. Click "Create Project"
5. Expected: Project appears in dashboard
```

---

## 🔍 Debugging

### Check localStorage
1. Open DevTools: `F12`
2. Go to: Application → LocalStorage → http://localhost:3000
3. Look for:
   - `auth_user` - Should contain user object
   - `auth_token` - Should contain mock token

### Check Console
1. Open DevTools: `F12`
2. Go to: Console tab
3. Look for any red errors
4. Check for API calls (should be none in demo mode)

### Check Network
1. Open DevTools: `F12`
2. Go to: Network tab
3. Perform login
4. Should see NO network requests (demo mode)
5. If you see requests to `/api/auth/login`, backend is being called

---

## ✅ Verification Checklist

- [ ] Frontend starts without errors
- [ ] Can navigate to login page
- [ ] Can login with any email
- [ ] Redirects to dashboard after login
- [ ] User name displayed in header
- [ ] Can logout
- [ ] Redirects to login after logout
- [ ] localStorage has auth_user and auth_token
- [ ] Session persists after page refresh
- [ ] Cannot access dashboard without login
- [ ] Can create projects
- [ ] Dashboard shows project count

---

## 📝 Test Data

Use any of these for testing:

```
Email: test@example.com
Email: demo@example.com
Email: user@example.com
Email: john.doe@example.com
Email: jane.smith@example.com
```

---

## 🐛 Common Issues

### Issue: "Sign up failed"
- Check browser console (F12)
- Verify email format is valid
- Try different email
- Restart dev server

### Issue: Not redirecting to dashboard
- Check localStorage (DevTools → Application)
- Verify auth_user and auth_token exist
- Check browser console for errors
- Try clearing cache (Ctrl+Shift+Delete)

### Issue: Logged out after refresh
- Check if localStorage is enabled
- Try non-private/incognito window
- Check browser console for errors
- Verify store.ts is loading from localStorage

### Issue: Port 3000 already in use
```bash
npm run dev -- -p 3001
# Then go to http://localhost:3001
```

---

## 📊 Expected Behavior

### Login Page
- Shows "BRD Gen" title
- Shows "Sign in to your account" subtitle
- Email input field
- "Sign In" button
- "Don't have an account? Sign up" link
- Google login button
- Demo mode banner

### Dashboard Page
- Shows "Welcome back, [Name]!" message
- Shows project count
- Shows featured slider (if projects exist)
- Shows stats section (if projects exist)
- Shows quick actions
- Shows "No projects yet" if no projects
- Header with user profile and logout

### After Logout
- Redirects to login page
- localStorage cleared
- Cannot access dashboard directly

---

## 🎯 Success Criteria

✅ All tests pass
✅ No console errors
✅ localStorage has auth data
✅ Session persists across refreshes
✅ Protected routes work
✅ Logout clears session
✅ Can create projects
✅ Dashboard displays correctly

---

## 📞 Need Help?

1. Check the console (F12)
2. Check localStorage (DevTools → Application)
3. Read DEMO_MODE_VERIFICATION.md for detailed info
4. Restart dev server: `npm run dev`
5. Clear cache: `Ctrl+Shift+Delete`

