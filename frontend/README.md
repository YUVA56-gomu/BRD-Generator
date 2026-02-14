# BRD Generator Frontend

A modern, production-ready SaaS dashboard built with Next.js for the AI-powered Business Requirements Document generator platform.

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Language**: TypeScript

## Features

### Authentication
- Login page with email/password
- Signup page with account creation
- Protected routes
- Token-based authentication

### Project Dashboard
- List all projects
- Create new projects
- Project cards with metadata
- Quick access to project details

### Project Workspace
Four main tabs for project management:

1. **Sources Tab**
   - Upload documents (PDF, TXT, DOCX)
   - Paste email/chat text
   - List uploaded sources
   - Delete sources

2. **Requirements Tab**
   - Display extracted requirements
   - Filter by type (functional, non-functional, risk, timeline, etc.)
   - View requirement details

3. **BRD Editor Tab**
   - View generated BRD
   - Edit sections with natural language
   - Regenerate BRD
   - Rich text display

4. **Traceability Matrix Tab**
   - Table mapping requirements
   - View requirement status
   - Track requirement priority

### Integrations Page
- Gmail integration (placeholder)
- Slack integration (placeholder)
- Connection status display

### UI Components
- Responsive sidebar navigation
- Top header with user profile
- Reusable card components
- Modal dialogs
- Loading spinners
- Alert notifications
- Tab navigation
- Form inputs
- Buttons with variants

## Project Structure

```
frontend/
├── app/                          # Next.js app directory
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   ├── dashboard/
│   │   └── page.tsx              # Projects dashboard
│   ├── projects/
│   │   └── [id]/
│   │       └── page.tsx          # Project workspace
│   └── integrations/
│       └── page.tsx              # Integrations page
├── components/
│   ├── Layout/
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── Header.tsx            # Top header
│   │   └── MainLayout.tsx        # Main layout wrapper
│   ├── Common/
│   │   ├── Button.tsx            # Button component
│   │   ├── Card.tsx              # Card component
│   │   ├── Modal.tsx             # Modal dialog
│   │   ├── Input.tsx             # Input field
│   │   ├── Tabs.tsx              # Tab navigation
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   └── Alert.tsx             # Alert notification
│   ├── Auth/
│   │   ├── LoginForm.tsx         # Login form
│   │   └── SignupForm.tsx        # Signup form
│   ├── Projects/
│   │   ├── ProjectCard.tsx       # Project card
│   │   └── CreateProjectModal.tsx # Create project modal
│   └── Workspace/
│       ├── SourcesTab.tsx        # Sources management
│       ├── RequirementsTab.tsx   # Requirements display
│       ├── BRDEditorTab.tsx      # BRD editor
│       └── TraceabilityTab.tsx   # Traceability matrix
├── lib/
│   ├── store.ts                  # Zustand stores
│   └── api.ts                    # API client
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=BRD Generator
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

### Type Checking

Run TypeScript type checking:
```bash
npm run type-check
```

## API Integration

The frontend communicates with the backend API using Axios. API endpoints are defined in `lib/api.ts`:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Projects
- `GET /projects/user/:userId` - List user projects
- `POST /projects` - Create project
- `GET /projects/:projectId` - Get project details
- `PUT /projects/:projectId` - Update project
- `DELETE /projects/:projectId` - Delete project

### Ingestion
- `POST /ingestion/upload` - Upload document or text
- `GET /ingestion/sources/:projectId` - Get project sources
- `GET /ingestion/source/:sourceId` - Get source details
- `DELETE /ingestion/source/:sourceId` - Delete source

### Requirements
- `GET /requirements/:projectId` - Get all requirements
- `GET /requirements/:projectId/type/:type` - Get requirements by type
- `PUT /requirements/:requirementId` - Update requirement
- `DELETE /requirements/:requirementId` - Delete requirement

### BRD
- `POST /brds/generate/:projectId` - Generate BRD
- `GET /brds/:brdId` - Get BRD details
- `GET /brds/project/:projectId` - Get project BRDs
- `PUT /brds/:brdId/edit` - Edit BRD section
- `DELETE /brds/:brdId` - Delete BRD

## State Management

The application uses Zustand for state management with the following stores:

### useAuthStore
- `user` - Current user
- `token` - Authentication token
- `isAuthenticated` - Auth status
- `setUser()` - Set user
- `setToken()` - Set token
- `logout()` - Logout user

### useProjectStore
- `projects` - List of projects
- `currentProject` - Active project
- `setProjects()` - Set projects
- `setCurrentProject()` - Set active project
- `addProject()` - Add new project

### useRequirementStore
- `requirements` - List of requirements
- `setRequirements()` - Set requirements
- `addRequirement()` - Add requirement

### useSourceStore
- `sources` - List of sources
- `setSources()` - Set sources
- `addSource()` - Add source

### useBRDStore
- `brd` - Current BRD document
- `setBRD()` - Set BRD

## Styling

The application uses Tailwind CSS for styling with custom configuration:

### Color Palette
- **Primary**: Sky blue (0ea5e9)
- **Secondary**: Slate gray (64748b)
- **Success**: Green
- **Warning**: Orange
- **Error**: Red

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Responsive sidebar (hidden on mobile)
- Mobile-optimized navigation

## Components

### Reusable Components

**Button**
```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Card**
```tsx
<Card hover className="p-6">
  Content here
</Card>
```

**Modal**
```tsx
<Modal isOpen={true} onClose={() => {}} title="Title">
  Content here
</Modal>
```

**Input**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
/>
```

**Tabs**
```tsx
<Tabs
  tabs={[{ id: 'tab1', label: 'Tab 1' }]}
  activeTab="tab1"
  onTabChange={(id) => {}}
>
  Content here
</Tabs>
```

## Performance Optimization

- Code splitting with Next.js dynamic imports
- Image optimization
- CSS minification
- JavaScript minification
- Lazy loading components
- Efficient state management

## Security

- Environment variables for sensitive data
- HTTPS in production
- CORS configuration
- Input validation
- XSS protection with React
- CSRF tokens (backend)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

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

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:3000/api |
| NEXT_PUBLIC_APP_NAME | Application name | BRD Generator |
| NEXT_PUBLIC_APP_URL | Frontend URL | http://localhost:3001 |

## Troubleshooting

### API Connection Issues
- Verify backend is running on correct port
- Check NEXT_PUBLIC_API_URL environment variable
- Check CORS configuration on backend

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`

### Performance Issues
- Check network tab in browser DevTools
- Monitor bundle size: `npm run build`
- Use React DevTools Profiler

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please refer to the main project documentation.
