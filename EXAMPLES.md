# API Usage Examples

## Setup

Start the server:
```bash
npm install
npm run migrate
npm run dev
```

---

## Complete Workflow Example

### 1. Create a User (Seed Data)
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-001",
    "name": "E-Commerce Platform",
    "description": "New e-commerce platform for retail business"
  }'
```

Response:
```json
{
  "id": "proj-001",
  "user_id": "user-001",
  "name": "E-Commerce Platform",
  "description": "New e-commerce platform for retail business",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### 2. Upload Meeting Transcript
```bash
curl -X POST http://localhost:3000/api/ingestion/upload \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj-001",
    "sourceType": "meeting_transcript",
    "text": "In the meeting, stakeholders discussed the need for a robust payment system that supports multiple payment methods including credit cards, digital wallets, and bank transfers. The system must handle high transaction volumes during peak shopping seasons. Security is critical - we need PCI DSS compliance. The team also mentioned the need for real-time inventory management and order tracking capabilities. Timeline: Phase 1 (4 weeks) for core functionality, Phase 2 (6 weeks) for advanced features."
  }'
```

Response:
```json
{
  "source": {
    "id": "src-001",
    "project_id": "proj-001",
    "source_type": "meeting_transcript",
    "created_at": "2024-01-15T10:35:00Z"
  },
  "requirements": [
    {
      "id": "req-001",
      "project_id": "proj-001",
      "requirement_type": "functional",
      "title": "Payment Processing",
      "description": "System must support multiple payment methods",
      "source_id": "src-001",
      "status": "draft"
    },
    {
      "id": "req-002",
      "requirement_type": "non_functional",
      "title": "PCI DSS Compliance",
      "description": "System must be PCI DSS compliant"
    },
    {
      "id": "req-003",
      "requirement_type": "functional",
      "title": "Inventory Management",
      "description": "Real-time inventory management capability"
    }
  ],
  "message": "Ingested 8 requirements from source"
}
```

### 3. Upload Email
```bash
curl -X POST http://localhost:3000/api/ingestion/upload \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj-001",
    "sourceType": "email",
    "text": "Hi team, we need to ensure the platform can scale to handle 100,000 concurrent users. Response time should be under 200ms. We also need comprehensive analytics and reporting features. The stakeholders include product managers, engineers, and business analysts. Key risks include third-party API dependencies and data migration complexity."
  }'
```

### 4. Upload Slack Message
```bash
curl -X POST http://localhost:3000/api/ingestion/upload \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj-001",
    "sourceType": "slack",
    "text": "Team decision: We will use PostgreSQL for the database and Redis for caching. We decided to go with microservices architecture. Success metrics: 99.9% uptime, < 100ms response time, support 50,000 concurrent users in phase 1."
  }'
```

### 5. Get All Requirements
```bash
curl -X GET http://localhost:3000/api/requirements/proj-001
```

Response:
```json
[
  {
    "id": "req-001",
    "project_id": "proj-001",
    "requirement_type": "functional",
    "title": "Payment Processing",
    "description": "System must support multiple payment methods",
    "priority": null,
    "status": "draft",
    "created_at": "2024-01-15T10:35:00Z"
  },
  {
    "id": "req-002",
    "requirement_type": "non_functional",
    "title": "PCI DSS Compliance",
    "description": "System must be PCI DSS compliant"
  }
]
```

### 6. Get Requirements by Type
```bash
curl -X GET http://localhost:3000/api/requirements/proj-001/type/functional
```

### 7. Update Requirement
```bash
curl -X PUT http://localhost:3000/api/requirements/req-001 \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "high",
    "status": "approved"
  }'
```

### 8. Generate BRD
```bash
curl -X POST http://localhost:3000/api/brds/generate/proj-001 \
  -H "Content-Type: application/json"
```

Response:
```json
{
  "id": "brd-001",
  "project_id": "proj-001",
  "title": "BRD - E-Commerce Platform",
  "executive_summary": "This document outlines the requirements for a new e-commerce platform designed to support retail business operations. The platform will handle high transaction volumes with robust payment processing, real-time inventory management, and comprehensive analytics capabilities.",
  "business_objectives": "1. Enable online sales channel\n2. Improve customer experience\n3. Streamline inventory management\n4. Provide business intelligence",
  "stakeholders": [
    "Product Manager",
    "Engineering Lead",
    "Business Analyst",
    "Finance Team"
  ],
  "functional_requirements": [
    "Payment processing with multiple methods",
    "Real-time inventory management",
    "Order tracking",
    "Analytics and reporting"
  ],
  "non_functional_requirements": [
    "PCI DSS compliance",
    "Support 100,000 concurrent users",
    "Response time < 200ms",
    "99.9% uptime"
  ],
  "assumptions": [
    "Budget approved",
    "Team available",
    "Third-party APIs reliable"
  ],
  "risks": [
    "Third-party API dependency",
    "Data migration complexity",
    "Security vulnerabilities"
  ],
  "timeline": [
    "Phase 1 (4 weeks): Core functionality",
    "Phase 2 (6 weeks): Advanced features"
  ],
  "success_metrics": [
    "99.9% uptime",
    "< 100ms response time",
    "Support 50,000 concurrent users"
  ],
  "version": 1,
  "status": "draft",
  "created_at": "2024-01-15T10:45:00Z"
}
```

### 9. Get BRD
```bash
curl -X GET http://localhost:3000/api/brds/brd-001
```

### 10. Edit BRD Section
```bash
curl -X PUT http://localhost:3000/api/brds/brd-001/edit \
  -H "Content-Type: application/json" \
  -d '{
    "sectionName": "executive_summary",
    "editRequest": "Make it more concise and emphasize the ROI benefits. Focus on revenue generation potential."
  }'
```

Response:
```json
{
  "id": "brd-001",
  "executive_summary": "This e-commerce platform will generate significant revenue through online sales while reducing operational costs. Expected ROI: 300% within 18 months. The platform supports high-volume transactions with enterprise-grade security and scalability.",
  "updated_at": "2024-01-15T10:50:00Z"
}
```

### 11. Get Project BRDs
```bash
curl -X GET http://localhost:3000/api/brds/project/proj-001
```

### 12. List Project Sources
```bash
curl -X GET http://localhost:3000/api/ingestion/sources/proj-001
```

### 13. Update Project
```bash
curl -X PUT http://localhost:3000/api/projects/proj-001 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "description": "E-commerce platform - Phase 1 in progress"
  }'
```

### 14. List User Projects
```bash
curl -X GET http://localhost:3000/api/projects/user/user-001
```

---

## File Upload Example

### Upload Document File
```bash
curl -X POST http://localhost:3000/api/ingestion/upload \
  -F "file=@requirements.txt" \
  -F "projectId=proj-001" \
  -F "sourceType=document"
```

---

## Batch Operations

### Create Multiple Projects
```bash
for i in {1..3}; do
  curl -X POST http://localhost:3000/api/projects \
    -H "Content-Type: application/json" \
    -d "{
      \"userId\": \"user-001\",
      \"name\": \"Project $i\",
      \"description\": \"Sample project $i\"
    }"
done
```

---

## Error Handling Examples

### Missing Required Field
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-001"
  }'
```

Response (400):
```json
{
  "error": "userId and name are required",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Resource Not Found
```bash
curl -X GET http://localhost:3000/api/projects/invalid-id
```

Response (404):
```json
{
  "error": "Project not found",
  "status": 404,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Health Check
```bash
curl -X GET http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Performance Testing

### Load Test with Apache Bench
```bash
ab -n 1000 -c 10 http://localhost:3000/health
```

### Load Test with wrk
```bash
wrk -t4 -c100 -d30s http://localhost:3000/health
```

---

## Debugging

### Enable Verbose Logging
```bash
LOG_LEVEL=debug npm run dev
```

### Check Database Connection
```bash
psql -h localhost -U postgres -d brd_generator -c "SELECT 1;"
```

### View Logs
```bash
tail -f logs/combined.log
```
