# Quick Run - Get Started in 2 Minutes

## Step 1: Install Dependencies
```bash
cd frontend
npm install
```

## Step 2: Create Environment File
```bash
cp .env.example .env.local
```

## Step 3: Start Development Server
```bash
npm run dev
```

## Step 4: Open in Browser
Go to: **http://localhost:3000**

---

## What You'll See

### Landing Page
- Welcome screen with features
- Sign In / Get Started buttons

### Sign Up
- Create account with email/password
- Redirects to dashboard

### Dashboard
- Projects list (empty initially)
- "New Project" button

### Create Project
- Click "New Project"
- Enter project name
- Click "Create Project"

### Project Workspace
- **Sources Tab**: Upload documents or paste text
- **Requirements Tab**: View extracted requirements
- **BRD Editor Tab**: Generate and edit BRD
- **Traceability Tab**: View requirement matrix

---

## Demo Credentials (After Signup)
- Email: your-email@example.com
- Password: your-password

---

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```
Then go to: http://localhost:3001

### Clear Cache
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### TypeScript Errors
Already fixed! The tsconfig.json has been corrected.

---

## Features You Can Try

1. **Sign Up** - Create an account
2. **Create Project** - Add a new project
3. **Upload Data** - Try uploading a document or pasting text
4. **View Requirements** - See extracted requirements
5. **Generate BRD** - Generate a Business Requirements Document
6. **Edit BRD** - Edit sections with natural language

---

## Notes

- Backend API is mocked (no real backend needed for UI demo)
- All data is stored in browser state (Zustand)
- Refresh page will reset data
- For full functionality, run backend server on http://localhost:3000/api

---

**Ready? Run `npm run dev` and visit http://localhost:3000! 🚀**
