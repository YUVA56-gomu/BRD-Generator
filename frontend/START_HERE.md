# 🚀 START HERE - Run the Website in 2 Minutes

## Step 1: Open Terminal in Frontend Folder
```bash
cd frontend
```

## Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

## Step 3: Create Environment File (First Time Only)
```bash
cp .env.example .env.local
```

## Step 4: Start the Development Server
```bash
npm run dev
```
## Step 5: Open in Browser
Go to: **http://localhost:3000**

---

## 🎉 You're Done!

The website is now running with **mock data** (no backend needed).

---

## What to Try

### 1. Sign Up
- Click "Get Started"
- Enter any email and password
- Click "Create Account"

### 2. Create a Project
- Click "New Project" button
- Enter project name: "My First Project"
- Click "Create Project"

### 3. Upload Data
- Click on the project
- Go to "Sources" tab
- Paste some text or upload a file
- Click "Ingest Content"

### 4. View Requirements
- Go to "Requirements" tab
- See extracted requirements
- Filter by type

### 5. Generate BRD
- Go to "BRD Editor" tab
- Click "Generate BRD"
- Wait for generation (shows loading)
- View the generated BRD

### 6. Edit BRD
- In BRD Editor tab
- Select a section to edit
- Enter edit request (e.g., "Make it more concise")
- Click "Apply Edit"

### 7. View Traceability
- Go to "Traceability" tab
- See requirement mapping table

---

## Demo Credentials

After signup, you can use any email/password:
- Email: `demo@example.com`
- Password: `password123`

---

## Troubleshooting

### Port 3000 Already in Use?
```bash
npm run dev -- -p 3001
```
Then go to: http://localhost:3001

### Clear Cache & Reinstall
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Still Having Issues?
1. Make sure you're in the `frontend` folder
2. Make sure Node.js is installed: `node --version`
3. Try clearing browser cache (Ctrl+Shift+Delete)

---

## Features Available

✅ Sign up / Login
✅ Create projects
✅ Upload documents
✅ Paste text content
✅ View requirements
✅ Generate BRD
✅ Edit BRD sections
✅ View traceability matrix
✅ Responsive design
✅ Mobile navigation

---

## Notes

- **Mock Data**: All data is stored in browser memory (Zustand)
- **No Backend Needed**: Uses mock API by default
- **Refresh = Reset**: Refreshing the page will reset all data
- **Real Backend**: To use real backend, set `NEXT_PUBLIC_USE_MOCK_API=false` in `.env.local`

---

## Next Steps

1. Explore the UI
2. Try all features
3. Check the code in `frontend/` folder
4. Read `README.md` for more details
5. Run backend if you want real data persistence

---

**Ready? Run `npm run dev` now! 🎉**
