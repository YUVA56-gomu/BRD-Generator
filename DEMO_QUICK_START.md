# 🚀 Demo Mode - Quick Start

## Start Frontend Only

```bash
cd frontend && npm run dev
```

That's it! No backend needed.

## Login

1. Go to `http://localhost:3001/login`
2. Enter any email: `test@example.com`
3. Click "Sign In"
4. ✅ You're in!

## Signup

1. Go to `http://localhost:3001/signup`
2. Enter name: `John Doe`
3. Enter email: `john@example.com`
4. Click "Create Account"
5. ✅ Account created!

## Try These Emails

```
test@example.com
demo@test.com
john@example.com
jane@example.com
user@company.com
admin@app.com
```

## What You Can Do

✅ Login/Signup with any email
✅ View premium dashboard
✅ See featured project slider
✅ View statistics
✅ See quick actions
✅ View project cards
✅ Logout and login again
✅ Session persists

## What You Can't Do (Yet)

❌ Create projects (no backend)
❌ Upload documents (no backend)
❌ Generate BRDs (no backend)

## Demo Features

- **No password needed** - Just enter email
- **Auto user creation** - Name generated from email
- **Session persists** - Close browser, still logged in
- **Multiple users** - Logout and login as different user
- **Instant login** - No API calls

## Test Scenarios

### Scenario 1: Quick Demo
```
1. Go to login
2. Enter: test@example.com
3. Click Sign In
4. Explore dashboard
```

### Scenario 2: Multiple Users
```
1. Login as: user1@test.com
2. Logout
3. Login as: user2@test.com
4. Each has separate session
```

### Scenario 3: Session Persistence
```
1. Login as: test@example.com
2. Close browser
3. Reopen browser
4. Go to http://localhost:3001/dashboard
5. Still logged in!
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Invalid email" | Use format: `test@example.com` |
| "Fill all fields" | Enter both name and email |
| Not redirecting | Check browser console |
| Session lost | Check localStorage enabled |

## Browser Storage

Check what's stored:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Look for `auth_user` and `auth_token`

## That's It!

You're ready to explore the premium dashboard in demo mode!

---

**Next Steps**:
1. ✅ Start frontend
2. ✅ Login with any email
3. ✅ Explore dashboard
4. ✅ Test features
5. ⏭️ When ready, connect to real backend
