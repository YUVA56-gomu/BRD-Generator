# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication. Future versions will implement JWT-based auth.

## Response Format

### Success Response
```json
{
  "id": "uuid",
  "data": {}
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Projects API

### Create Project
**POST** `/projects`

Request:
```json
{
  "userId": "user-123",
  "name": "Mobile App Project",
  "description": "New mobile banking application"
}
```

Response (201):
```json
{
  "id": "proj-123",
  "user_id": "user-123",
  "name": "Mobile App Project",
  "description": "New mobile banking application",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Get Project
**GET** `/projects/:projectId`

Response (200):
```json
{
  "id": "proj-123",
  "user_id": "user-123",
  "name": "Mobile App Project",
  "description": "New mobile banking application",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### List Projects
**GET** `/projects/user/:userId`

Response (200):
```json
[
  {
    "id": "proj-123",
    "user_id": "user-123",
    "name": "Mobile App Project",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Update Project
**PUT** `/projects/:projectId`

Request:
```json
{
  "name": "Updated Project Name",
  "status": "completed"
}
```

Response (200):
```json
{
  "id": "proj-123",
  "name": "Updated Project Name",
  "status": "completed",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

### Delete Project
**DELETE** `/projects/:projectId`

Response (200):
```json
{
  "success": true
}
```

---

## Data Ingestion API

### Upload Document
**POST** `/ingestion/upload`

Multipart Form Data:
- `file` (optional): Document file
- `projectId` (required): Project UUID
- `sourceType` (required): email | slack | meeting_transcript | document | other
- `text` (optional): Raw text content

Response (201):
```json
{
  "source": {
    "id": "src-123",
    "project_id": "proj-123",
    "source_type": "meeting_transcript",
    "file_name": "meeting_notes.txt",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "requirements": [
    {
      "id": "req-1",
      "requirement_type": "functional",
      "title": "User Authentication",
      "description": "System must support OAuth 2.0",
      "source_id": "src-123"
    }
  ],
  "message": "Ingested 5 requirements from source"
}
```

### Get Project Sources
**GET** `/ingestion/sources/:projectId`

Response (200):
```json
[
  {
    "id": "src-123",
    "project_id": "proj-123",
    "source_type": "meeting_transcript",
    "file_name": "meeting_notes.txt",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Get Source Details
**GET** `/ingestion/source/:sourceId`

Response (200):
```json
{
  "id": "src-123",
  "project_id": "proj-123",
  "source_type": "meeting_transcript",
  "source_text": "Full text content...",
  "file_name": "meeting_notes.txt",
  "file_path": "/uploads/meeting_notes.txt",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Delete Source
**DELETE** `/ingestion/source/:sourceId`

Response (200):
```json
{
  "success": true
}
```

---

## Requirements API

### Get All Requirements
**GET** `/requirements/:projectId`

Response (200):
```json
[
  {
    "id": "req-1",
    "project_id": "proj-123",
    "requirement_type": "functional",
    "title": "User Authentication",
    "description": "System must support OAuth 2.0",
    "source_id": "src-123",
    "priority": "high",
    "status": "draft",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Get Requirements by Type
**GET** `/requirements/:projectId/type/:type`

Types: `stakeholder`, `functional`, `non_functional`, `decision`, `risk`, `timeline`

Response (200):
```json
[
  {
    "id": "req-1",
    "requirement_type": "functional",
    "title": "User Authentication",
    "description": "System must support OAuth 2.0"
  }
]
```

### Update Requirement
**PUT** `/requirements/:requirementId`

Request:
```json
{
  "priority": "critical",
  "status": "approved"
}
```

Response (200):
```json
{
  "id": "req-1",
  "priority": "critical",
  "status": "approved",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

### Delete Requirement
**DELETE** `/requirements/:requirementId`

Response (200):
```json
{
  "success": true
}
```

---

## BRD API

### Generate BRD
**POST** `/brds/generate/:projectId`

Response (201):
```json
{
  "id": "brd-123",
  "project_id": "proj-123",
  "title": "BRD - Mobile App Project",
  "executive_summary": "This document outlines...",
  "business_objectives": "The primary objectives are...",
  "stakeholders": ["Product Manager", "Engineering Lead", "Business Analyst"],
  "functional_requirements": [
    "User authentication",
    "Payment processing"
  ],
  "non_functional_requirements": [
    "System must handle 10,000 concurrent users",
    "Response time < 200ms"
  ],
  "assumptions": ["Budget approved", "Team available"],
  "risks": ["Third-party API dependency"],
  "timeline": ["Phase 1: 4 weeks", "Phase 2: 6 weeks"],
  "success_metrics": ["User adoption > 80%"],
  "traceability_matrix": [
    {
      "id": "req-1",
      "type": "functional",
      "title": "User Authentication",
      "source": "src-123",
      "status": "draft"
    }
  ],
  "version": 1,
  "status": "draft",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Get BRD
**GET** `/brds/:brdId`

Response (200):
```json
{
  "id": "brd-123",
  "project_id": "proj-123",
  "title": "BRD - Mobile App Project",
  "executive_summary": "...",
  "version": 1,
  "status": "draft"
}
```

### Get Project BRDs
**GET** `/brds/project/:projectId`

Response (200):
```json
[
  {
    "id": "brd-123",
    "project_id": "proj-123",
    "title": "BRD - Mobile App Project",
    "version": 1,
    "status": "draft",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Edit BRD Section
**PUT** `/brds/:brdId/edit`

Request:
```json
{
  "sectionName": "executive_summary",
  "editRequest": "Make it more concise and focus on ROI benefits"
}
```

Response (200):
```json
{
  "id": "brd-123",
  "executive_summary": "Updated summary...",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

### Delete BRD
**DELETE** `/brds/:brdId`

Response (200):
```json
{
  "success": true
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently not implemented. Future versions will include:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

Future versions will support pagination with:
- `limit`: Number of results (default: 20, max: 100)
- `offset`: Number of results to skip (default: 0)

Example:
```
GET /api/projects/user/:userId?limit=20&offset=0
```

---

## Webhooks

Future versions will support webhooks for:
- BRD generation completion
- Requirement extraction completion
- Project status changes
