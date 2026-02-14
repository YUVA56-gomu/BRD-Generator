# Architecture Documentation

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Applications                      │
│                  (Web, Mobile, Desktop)                      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
┌────────────────────────▼────────────────────────────────────┐
│                    Express.js Server                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes & Controllers                │   │
│  │  (Projects, Ingestion, Requirements, BRD)           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Business Logic Services                 │   │
│  │  (ProjectService, IngestionService, etc.)           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Middleware & Utilities                  │   │
│  │  (Error Handler, Logger, Validators)                │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
         │               │               │
         │               │               │
    ┌────▼──┐      ┌─────▼──┐      ┌────▼──────┐
    │   DB  │      │  LLM   │      │  ChromaDB  │
    │ (PG)  │      │ (OpenAI)       │ (Vector)   │
    └───────┘      └────────┘      └────────────┘
```

## Layered Architecture

### 1. Presentation Layer (Routes)
- HTTP endpoints
- Request validation
- Response formatting
- Error handling

**Files**: `src/routes/*.js`

### 2. Controller Layer
- Request handling
- Parameter extraction
- Service invocation
- Response preparation

**Files**: `src/controllers/*.js`

### 3. Service Layer
- Business logic
- Data processing
- LLM integration
- Database operations

**Files**: `src/services/*.js`

### 4. Data Access Layer
- Database queries
- Connection management
- Transaction handling

**Files**: `src/config/database.js`

### 5. Configuration Layer
- Environment setup
- Database connection
- Logger initialization
- LLM configuration

**Files**: `src/config/*.js`

---

## Data Flow

### Ingestion Flow
```
User Upload
    ↓
Ingestion Controller
    ↓
Ingestion Service (Store Source)
    ↓
PostgreSQL (sources table)
    ↓
Requirement Service (Extract)
    ↓
LLM API (OpenAI/Gemini)
    ↓
Parse Response
    ↓
Store Requirements
    ↓
PostgreSQL (requirements table)
    ↓
Return to Client
```

### BRD Generation Flow
```
Generate Request
    ↓
BRD Controller
    ↓
BRD Service
    ↓
Fetch Requirements
    ↓
PostgreSQL (requirements table)
    ↓
Group by Type
    ↓
LLM API (Generate Sections)
    ↓
Create BRD Document
    ↓
PostgreSQL (brd_documents table)
    ↓
Return to Client
```

### BRD Edit Flow
```
Edit Request
    ↓
BRD Controller
    ↓
BRD Service
    ↓
Fetch Current Content
    ↓
LLM API (Regenerate Section)
    ↓
Store Edit History
    ↓
Update BRD Document
    ↓
PostgreSQL (brd_documents, requirement_edits)
    ↓
Return to Client
```

---

## Database Schema Relationships

```
users (1) ──────────────── (N) projects
                              │
                              ├─── (N) sources
                              │        │
                              │        └─── (N) requirements
                              │
                              ├─── (N) requirements
                              │
                              └─── (N) brd_documents
                                       │
                                       └─── (N) requirement_edits
```

### Key Relationships
- **users → projects**: One user has many projects
- **projects → sources**: One project has many data sources
- **projects → requirements**: One project has many requirements
- **sources → requirements**: One source can generate many requirements
- **projects → brd_documents**: One project has many BRD versions
- **brd_documents → requirement_edits**: One BRD has many edit records

---

## Service Architecture

### ProjectService
```
├── createProject(userId, name, description)
├── getProjectById(projectId)
├── listProjects(userId)
├── updateProject(projectId, updates)
└── deleteProject(projectId)
```

### IngestionService
```
├── storeSource(projectId, sourceType, sourceText, fileName, filePath)
├── getSourcesByProject(projectId)
├── getSourceById(sourceId)
└── deleteSource(sourceId)
```

### RequirementService
```
├── extractRequirements(projectId, sourceId, sourceText)
├── storeRequirement(projectId, type, title, description, sourceId)
├── getRequirementsByProject(projectId)
├── getRequirementsByType(projectId, type)
├── updateRequirement(requirementId, updates)
└── deleteRequirement(requirementId)
```

### BRDService
```
├── generateBRD(projectId, projectName)
├── groupRequirements(requirements)
├── generateSections(projectName, groupedReqs)
├── generateTraceabilityMatrix(requirements)
├── getBRDById(brdId)
├── getBRDsByProject(projectId)
├── editBRDSection(brdId, sectionName, editRequest)
└── deleteBRD(brdId)
```

---

## LLM Integration

### Supported Providers
1. **OpenAI (GPT-4)**
   - Model: gpt-4
   - Temperature: 0.7
   - Max tokens: 2000

2. **Google Gemini**
   - Model: gemini-pro
   - Temperature: 0.7
   - Max tokens: 2000

### LLM Call Flow
```
callLLM(prompt, systemPrompt)
    ↓
Check LLM_PROVIDER env
    ├─ openai → callOpenAI()
    └─ gemini → callGemini()
    ↓
Make API Request
    ↓
Parse Response
    ↓
Return Content
```

### Prompt Templates
Located in `src/utils/prompts.js`:
- EXTRACTION_SYSTEM_PROMPT
- EXTRACTION_USER_PROMPT
- BRD_GENERATION_SYSTEM_PROMPT
- BRD_GENERATION_USER_PROMPT
- BRD_EDIT_SYSTEM_PROMPT
- BRD_EDIT_USER_PROMPT

---

## Error Handling Strategy

### Error Types
1. **Validation Errors** (400)
   - Missing required fields
   - Invalid data format
   - Invalid UUID

2. **Not Found Errors** (404)
   - Resource doesn't exist
   - Project not found
   - BRD not found

3. **Server Errors** (500)
   - Database connection failure
   - LLM API failure
   - Unexpected exceptions

### Error Middleware
```javascript
errorHandler(err, req, res, next)
    ↓
Log Error
    ↓
Determine Status Code
    ↓
Format Response
    ↓
Send to Client
```

---

## Logging Architecture

### Log Levels
- **error**: Error events
- **warn**: Warning events
- **info**: Informational events
- **debug**: Debug information

### Log Destinations
- **error.log**: Error level only
- **combined.log**: All levels
- **Console**: Development mode only

### Log Format
```json
{
  "level": "info",
  "message": "Project created: proj-123",
  "timestamp": "2024-01-15T10:30:00Z",
  "service": "brd-generator"
}
```

---

## Security Architecture

### Input Validation
```
Request
    ↓
Joi Schema Validation
    ↓
Sanitize Input
    ↓
Pass to Service
```

### Database Security
- Parameterized queries (prevent SQL injection)
- Connection pooling
- Encrypted passwords in .env

### API Security
- Helmet.js (HTTP headers)
- CORS (cross-origin control)
- Rate limiting (future)
- JWT authentication (future)

---

## Scalability Considerations

### Horizontal Scaling
- Stateless design
- Load balancer ready
- Database connection pooling
- Session management (future)

### Vertical Scaling
- Async/await operations
- Non-blocking I/O
- Efficient memory usage
- Connection pooling

### Database Optimization
- Indexes on foreign keys
- Indexes on frequently queried fields
- JSONB for complex data
- Query optimization

### Caching Strategy (Future)
- Redis for session data
- Cache BRD generation results
- Cache requirement extraction
- Cache LLM responses

---

## Deployment Architecture

### Development
```
Local Machine
    ├── Node.js Server
    ├── PostgreSQL (Docker)
    └── ChromaDB (Docker)
```

### Production
```
Load Balancer
    ├── Node.js Instance 1
    ├── Node.js Instance 2
    └── Node.js Instance 3
         ↓
    PostgreSQL Cluster
         ↓
    ChromaDB Cluster
```

### Kubernetes
```
Namespace: brd-generator
    ├── Deployment (3 replicas)
    ├── Service (LoadBalancer)
    ├── HPA (3-10 replicas)
    ├── PDB (min 2 available)
    ├── ConfigMap
    └── Secret
```

---

## Performance Metrics

### Target Metrics
- **Response Time**: < 200ms (p95)
- **Throughput**: 1000 req/sec
- **Availability**: 99.9%
- **Error Rate**: < 0.1%

### Monitoring Points
- API response times
- Database query times
- LLM API latency
- Memory usage
- CPU usage
- Error rates

---

## Future Architecture Enhancements

### Phase 2
- [ ] JWT authentication
- [ ] Rate limiting
- [ ] Request caching
- [ ] WebSocket support
- [ ] Webhook system

### Phase 3
- [ ] ChromaDB semantic search
- [ ] PDF/Word export
- [ ] Collaborative editing
- [ ] Real-time updates
- [ ] Advanced analytics

### Phase 4
- [ ] Multi-tenant support
- [ ] Custom LLM models
- [ ] Advanced caching
- [ ] GraphQL API
- [ ] Mobile app backend

---

## Technology Decisions

### Why Express.js?
- Lightweight and flexible
- Large ecosystem
- Easy middleware integration
- Good performance

### Why PostgreSQL?
- ACID compliance
- JSONB support
- Excellent indexing
- Mature and stable

### Why ChromaDB?
- Vector storage for semantic search
- Easy integration
- Open source
- Scalable

### Why Winston Logger?
- Production-grade logging
- Multiple transports
- Structured logging
- Easy configuration

---

## Code Organization Principles

1. **Separation of Concerns**: Each layer has specific responsibility
2. **DRY (Don't Repeat Yourself)**: Reusable services and utilities
3. **SOLID Principles**: Single responsibility, Open/closed, etc.
4. **Error Handling**: Centralized error middleware
5. **Configuration**: Environment-based configuration
6. **Logging**: Comprehensive logging throughout
7. **Validation**: Input validation at controller level
8. **Documentation**: Clear code comments and documentation

---

## API Contract

### Request Format
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

### Response Format
```json
{
  "id": "uuid",
  "field1": "value1",
  "created_at": "timestamp"
}
```

### Error Format
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "timestamp"
}
```

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] LLM API keys set
- [ ] Logs directory created
- [ ] Uploads directory created
- [ ] Health check passing
- [ ] Database connection verified
- [ ] LLM API connection verified
- [ ] Security headers enabled
- [ ] CORS configured
- [ ] Error handling tested
- [ ] Performance tested
