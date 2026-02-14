# AI Business Requirements Document (BRD) Generator - Backend

A production-ready backend for an AI-powered platform that ingests communication data and generates structured Business Requirements Documents.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (metadata storage)
- **Vector Store**: ChromaDB (for semantic search)
- **LLM**: OpenAI GPT-4 / Google Gemini
- **File Upload**: Multer
- **Logging**: Winston

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── database.js      # PostgreSQL connection
│   ├── logger.js        # Winston logger setup
│   └── llm.js           # LLM API integration
├── db/
│   ├── schema.sql       # Database schema
│   ├── migrations/      # Migration scripts
│   └── seeds/           # Seed data
├── services/            # Business logic
│   ├── projectService.js
│   ├── ingestionService.js
│   ├── requirementService.js
│   └── brdService.js
├── controllers/         # Request handlers
│   ├── projectController.js
│   ├── ingestionController.js
│   ├── requirementController.js
│   └── brdController.js
├── routes/              # API routes
│   ├── projectRoutes.js
│   ├── ingestionRoutes.js
│   ├── requirementRoutes.js
│   └── brdRoutes.js
├── middleware/          # Express middleware
│   └── errorHandler.js
└── index.js             # Server entry point
```

## Setup Instructions

### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- OpenAI API key or Google Gemini API key

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=brd_generator
DB_USER=postgres
DB_PASSWORD=postgres
OPENAI_API_KEY=your_key_here
LLM_PROVIDER=openai
```

4. Initialize the database:
```bash
npm run migrate
```

5. Seed sample data (optional):
```bash
npm run seed
```

6. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects/:projectId` - Get project
- `GET /api/projects/user/:userId` - List user projects
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

### Data Ingestion
- `POST /api/ingestion/upload` - Upload document/text
- `GET /api/ingestion/sources/:projectId` - Get project sources
- `GET /api/ingestion/source/:sourceId` - Get source details
- `DELETE /api/ingestion/source/:sourceId` - Delete source

### Requirements
- `GET /api/requirements/:projectId` - Get all requirements
- `GET /api/requirements/:projectId/type/:type` - Get requirements by type
- `PUT /api/requirements/:requirementId` - Update requirement
- `DELETE /api/requirements/:requirementId` - Delete requirement

### BRD Documents
- `POST /api/brds/generate/:projectId` - Generate BRD
- `GET /api/brds/:brdId` - Get BRD
- `GET /api/brds/project/:projectId` - Get project BRDs
- `PUT /api/brds/:brdId/edit` - Edit BRD section
- `DELETE /api/brds/:brdId` - Delete BRD

## Example Usage

### 1. Create a Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "name": "Mobile App Project",
    "description": "New mobile banking application"
  }'
```

### 2. Upload Document
```bash
curl -X POST http://localhost:3000/api/ingestion/upload \
  -F "file=@meeting_notes.txt" \
  -F "projectId=project-123" \
  -F "sourceType=meeting_transcript"
```

### 3. Generate BRD
```bash
curl -X POST http://localhost:3000/api/brds/generate/project-123 \
  -H "Content-Type: application/json"
```

### 4. Edit BRD Section
```bash
curl -X PUT http://localhost:3000/api/brds/brd-123/edit \
  -H "Content-Type: application/json" \
  -d '{
    "sectionName": "executive_summary",
    "editRequest": "Make it more concise and focus on ROI"
  }'
```

## Database Schema

### Users
- id (UUID)
- email (VARCHAR)
- name (VARCHAR)
- created_at, updated_at (TIMESTAMP)

### Projects
- id (UUID)
- user_id (UUID FK)
- name, description (VARCHAR/TEXT)
- status (VARCHAR)
- created_at, updated_at (TIMESTAMP)

### Sources
- id (UUID)
- project_id (UUID FK)
- source_type (VARCHAR)
- source_text (TEXT)
- file_name, file_path (VARCHAR)
- created_at (TIMESTAMP)

### Requirements
- id (UUID)
- project_id (UUID FK)
- requirement_type (VARCHAR)
- title, description (VARCHAR/TEXT)
- source_id (UUID FK)
- priority, status (VARCHAR)
- created_at, updated_at (TIMESTAMP)

### BRD Documents
- id (UUID)
- project_id (UUID FK)
- title (VARCHAR)
- executive_summary, business_objectives (TEXT)
- stakeholders, functional_requirements, etc. (JSONB)
- version (INT)
- status (VARCHAR)
- created_at, updated_at (TIMESTAMP)

## Features

### 1. Project Management
- Create, read, update, delete projects
- Track project status and metadata

### 2. Data Ingestion
- Upload documents (PDF, TXT, DOCX)
- Ingest text directly (emails, Slack messages)
- Store source citations for traceability

### 3. Requirement Extraction
- LLM-powered extraction of:
  - Stakeholders
  - Functional requirements
  - Non-functional requirements
  - Decisions
  - Risks
  - Timeline items

### 4. BRD Generation
- Automatic generation of structured BRD with:
  - Executive Summary
  - Business Objectives
  - Stakeholders
  - Functional Requirements
  - Non-Functional Requirements
  - Assumptions
  - Risks
  - Timeline
  - Success Metrics
  - Traceability Matrix

### 5. BRD Editing
- Natural language edit requests
- LLM-powered section regeneration
- Edit history tracking

### 6. Citation Tracking
- Every requirement tracks:
  - Source type
  - Source text
  - Timestamp
  - Original file reference

## Error Handling

The API returns standardized error responses:
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Logging

Logs are written to:
- `logs/error.log` - Error level logs
- `logs/combined.log` - All logs
- Console (development mode)

## Performance Considerations

- Database indexes on frequently queried fields
- Connection pooling for PostgreSQL
- Multer for efficient file uploads
- Async/await for non-blocking operations

## Security

- Helmet.js for HTTP headers
- CORS enabled for cross-origin requests
- Input validation with Joi
- Environment variables for sensitive data
- SQL injection prevention via parameterized queries

## Future Enhancements

- JWT authentication
- ChromaDB integration for semantic search
- WebSocket support for real-time updates
- BRD export to PDF/Word
- Collaborative editing
- Version control for BRDs
- Advanced analytics

## License

MIT
