# Getting Started - BRD Generator Frontend

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=BRD Generator
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:3000`

---

## First Time Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Backend API running on http://localhost:3000

### Installation Steps

1. **Clone/Navigate to Frontend**
```bash
cd frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment File**
```bash
cp .env.example .env.local
```

4. **Update Environment Variables**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

5. **Start Development Server**
```bash
npm run dev
```

6. **Access Application**
- Open http://localhost:3000 in your browser

---

## Using the Application

### 1. Create Account
- Click "Get Started" on landing page
- Fill in name, email, password
- Click "Create Account"

### 2. Login
- Enter email and password
- Click "Sign In"

### 3. Create Project
- Click "New Project" button
- Enter project name and description
- Click "Create Project"

### 4. Upload Data
- Go to project
- Click "Sources" tab
- Choose "Upload Document" or "Paste Text"
- Upload file or paste content
- Click "Ingest Content"

### 5. View Requirements
- Click "Requirements" tab
- Filter by type using buttons
- View extracted requirements

### 6. Generate BRD
- Click "BRD Editor" tab
- Click "Generate BRD" button
- Wait for generation to complete
- View generated BRD sections

### 7. Edit BRD
- In BRD Editor tab
- Select section to edit
- Enter edit request (e.g., "Make it more concise")
- Click "Apply Edit"

### 8. View Traceability
- Click "Traceability" tab
- View requirement mapping table
- See requirement types and status

---

## Development Workflow

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

---

## Project Structure

### Pages
- `/` - Landing page
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Projects list
- `/projects/[id]` - Project workspace
- `/integrations` - Integrations page

### Components
- `Layout/` - Navigation and layout
- `Common/` - Reusable UI components
- `Auth/` - Authentication forms
- `Projects/` - Project management
- `Workspace/` - Project workspace tabs

### State Management
- `lib/store.ts` - Zustand stores

### API Integration
- `lib/api.ts` - Axios client and endpoints

---

## Common Tasks

### Add New Page
1. Create file in `app/` directory
2. Export default component
3. Add to navigation if needed

### Add New Component
1. Create file in `components/` directory
2. Export component
3. Import and use in pages

### Add New API Endpoint
1. Add function to `lib/api.ts`
2. Use in component with try-catch
3. Handle errors with toast

### Update Styling
1. Edit `tailwind.config.ts` for theme
2. Use Tailwind classes in components
3. Add custom CSS in `app/globals.css`

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### API Connection Error
- Verify backend is running: `http://localhost:3000/api`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for errors

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors
```bash
# Run type checking
npm run type-check

# Fix issues in code
```

### Styling Issues
- Clear browser cache
- Restart dev server
- Check Tailwind config

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3000/api |
| NEXT_PUBLIC_APP_NAME | App name | BRD Generator |
| NEXT_PUBLIC_APP_URL | Frontend URL | http://localhost:3001 |

---

## API Integration

### Making API Calls

```typescript
import { projectAPI } from '@/lib/api';

// List projects
const response = await projectAPI.list(userId);

// Create project
const response = await projectAPI.create(userId, name, description);

// Handle errors
try {
  const response = await projectAPI.list(userId);
} catch (error) {
  console.error('Failed:', error);
  toast.error('Error message');
}
```

### Available APIs

**Projects**
- `projectAPI.list(userId)`
- `projectAPI.create(userId, name, description)`
- `projectAPI.get(projectId)`
- `projectAPI.update(projectId, data)`
- `projectAPI.delete(projectId)`

**Ingestion**
- `ingestionAPI.upload(projectId, sourceType, text, file)`
- `ingestionAPI.getSources(projectId)`
- `ingestionAPI.getSource(sourceId)`
- `ingestionAPI.deleteSource(sourceId)`

**Requirements**
- `requirementAPI.list(projectId)`
- `requirementAPI.listByType(projectId, type)`
- `requirementAPI.update(requirementId, data)`
- `requirementAPI.delete(requirementId)`

**BRD**
- `brdAPI.generate(projectId)`
- `brdAPI.get(brdId)`
- `brdAPI.listByProject(projectId)`
- `brdAPI.editSection(brdId, sectionName, editRequest)`
- `brdAPI.delete(brdId)`

---

## State Management

### Using Stores

```typescript
import { useAuthStore, useProjectStore } from '@/lib/store';

// In component
const user = useAuthStore((state) => state.user);
const projects = useProjectStore((state) => state.projects);

// Update state
const setUser = useAuthStore((state) => state.setUser);
setUser(newUser);
```

### Available Stores
- `useAuthStore` - User authentication
- `useProjectStore` - Projects
- `useRequirementStore` - Requirements
- `useSourceStore` - Data sources
- `useBRDStore` - BRD documents

---

## Styling

### Tailwind CSS

```tsx
// Using Tailwind classes
<div className="bg-primary-600 text-white p-4 rounded-lg">
  Content
</div>

// Responsive
<div className="md:grid md:grid-cols-2 lg:grid-cols-3">
  Items
</div>

// Hover states
<button className="hover:bg-primary-700 transition-colors">
  Button
</button>
```

### Custom Colors
- Primary: `primary-50` to `primary-900`
- Secondary: `secondary-50` to `secondary-900`
- Status: `green`, `red`, `yellow`, `blue`

---

## Components

### Button
```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

### Card
```tsx
<Card hover className="p-6">
  Content
</Card>
```

### Modal
```tsx
<Modal isOpen={true} onClose={() => {}} title="Title">
  Content
</Modal>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid"
/>
```

### Tabs
```tsx
<Tabs
  tabs={[{ id: 'tab1', label: 'Tab 1' }]}
  activeTab="tab1"
  onTabChange={(id) => {}}
>
  Content
</Tabs>
```

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t brd-generator-frontend .
docker run -p 3000:3000 brd-generator-frontend
```

### Traditional Server
```bash
npm run build
npm start
```

---

## Performance Tips

1. **Use React DevTools Profiler**
   - Identify slow components
   - Optimize re-renders

2. **Check Bundle Size**
   ```bash
   npm run build
   ```

3. **Lazy Load Components**
   ```tsx
   import dynamic from 'next/dynamic';
   const Component = dynamic(() => import('./Component'));
   ```

4. **Optimize Images**
   - Use Next.js Image component
   - Compress images

---

## Debugging

### Browser DevTools
- Open DevTools (F12)
- Check Console for errors
- Use Network tab for API calls
- Use React DevTools for state

### Logging
```typescript
console.log('Debug:', value);
console.error('Error:', error);
```

### API Debugging
- Check network requests in DevTools
- Verify request/response format
- Check error messages

---

## Next Steps

1. **Explore the Code**
   - Read component files
   - Understand state management
   - Review API integration

2. **Customize**
   - Update colors in `tailwind.config.ts`
   - Add new components
   - Modify pages

3. **Deploy**
   - Build for production
   - Deploy to Vercel or server
   - Configure domain

4. **Extend**
   - Add new features
   - Integrate more APIs
   - Improve UI/UX

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com)

---

## Support

For issues:
1. Check this guide
2. Review README.md
3. Check browser console
4. Review backend logs
5. Check API responses

---

**Happy coding! 🚀**
