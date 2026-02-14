# Testing Guide

## Manual Testing

### Prerequisites
```bash
npm install
docker-compose up -d
npm run migrate
npm run dev
```

### Health Check
```bash
curl http://localhost:3000/health
```

Expected: `{"status":"ok","timestamp":"..."}`

---

## Integration Testing Workflow

### 1. Create Project
```bash
PROJECT_ID=$(curl -s -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-001",
    "name": "Test Project",
    "description": "Testing BRD generation"
  }' | jq -r '.id')

echo "Project ID: $PROJECT_ID"
```

### 2. Ingest Multiple Sources
```bash
# Email source
curl -X POST http://localhost:3000/api/ingestion/upload \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"sourceType\": \"email\",
    \"text\": \"We need a mobile app with user authentication, payment processing, and real-time notifications. The app should support iOS and Android. Timeline: 3 months.\"
  }"

# Meeting transcript
curl -X POST http://localhost:3000/api/ingestion/upload \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"sourceType\": \"meeting_transcript\",
    \"text\": \"Stakeholders: Product Manager, CTO, Business Analyst. Key decisions: Use React Native for cross-platform development. Risks: Third-party API dependencies. Success metrics: 100k downloads in first month.\"
  }"

# Slack message
curl -X POST http://localhost:3000/api/ingestion/upload \
  -H "Content-Type: application/json" \
  -d "{
    \"projectId\": \"$PROJECT_ID\",
    \"sourceType\": \"slack\",
    \"text\": \"Non-functional requirements: 99.9% uptime, response time < 200ms, support 50k concurrent users. Must comply with GDPR and CCPA.\"
  }"
```

### 3. Verify Requirements Extraction
```bash
curl -X GET http://localhost:3000/api/requirements/$PROJECT_ID | jq '.'
```

Expected: Array of extracted requirements with types: functional, non_functional, stakeholder, decision, risk, timeline

### 4. Get Requirements by Type
```bash
# Functional requirements
curl -X GET http://localhost:3000/api/requirements/$PROJECT_ID/type/functional | jq '.'

# Non-functional requirements
curl -X GET http://localhost:3000/api/requirements/$PROJECT_ID/type/non_functional | jq '.'

# Stakeholders
curl -X GET http://localhost:3000/api/requirements/$PROJECT_ID/type/stakeholder | jq '.'
```

### 5. Update Requirement
```bash
REQ_ID=$(curl -s -X GET http://localhost:3000/api/requirements/$PROJECT_ID | jq -r '.[0].id')

curl -X PUT http://localhost:3000/api/requirements/$REQ_ID \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "high",
    "status": "approved"
  }' | jq '.'
```

### 6. Generate BRD
```bash
BRD_ID=$(curl -s -X POST http://localhost:3000/api/brds/generate/$PROJECT_ID \
  -H "Content-Type: application/json" | jq -r '.id')

echo "BRD ID: $BRD_ID"
```

### 7. Retrieve Generated BRD
```bash
curl -X GET http://localhost:3000/api/brds/$BRD_ID | jq '.'
```

Expected: Complete BRD with all sections populated

### 8. Edit BRD Section
```bash
curl -X PUT http://localhost:3000/api/brds/$BRD_ID/edit \
  -H "Content-Type: application/json" \
  -d '{
    "sectionName": "executive_summary",
    "editRequest": "Make it more concise and emphasize the business value and ROI"
  }' | jq '.executive_summary'
```

### 9. Get Project BRDs
```bash
curl -X GET http://localhost:3000/api/brds/project/$PROJECT_ID | jq '.'
```

### 10. List Project Sources
```bash
curl -X GET http://localhost:3000/api/ingestion/sources/$PROJECT_ID | jq '.'
```

### 11. Get Source Details
```bash
SOURCE_ID=$(curl -s -X GET http://localhost:3000/api/ingestion/sources/$PROJECT_ID | jq -r '.[0].id')

curl -X GET http://localhost:3000/api/ingestion/source/$SOURCE_ID | jq '.'
```

### 12. Update Project
```bash
curl -X PUT http://localhost:3000/api/projects/$PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "description": "Updated description"
  }' | jq '.'
```

### 13. List User Projects
```bash
curl -X GET http://localhost:3000/api/projects/user/test-user-001 | jq '.'
```

### 14. Delete Operations
```bash
# Delete source
curl -X DELETE http://localhost:3000/api/ingestion/source/$SOURCE_ID

# Delete requirement
curl -X DELETE http://localhost:3000/api/requirements/$REQ_ID

# Delete BRD
curl -X DELETE http://localhost:3000/api/brds/$BRD_ID

# Delete project
curl -X DELETE http://localhost:3000/api/projects/$PROJECT_ID
```

---

## Error Testing

### Test Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"userId": "test-user"}'
```

Expected: 400 error with message about missing 'name'

### Test Invalid UUID
```bash
curl -X GET http://localhost:3000/api/projects/invalid-uuid
```

Expected: 404 error

### Test Non-existent Resource
```bash
curl -X GET http://localhost:3000/api/projects/00000000-0000-0000-0000-000000000000
```

Expected: 404 error

---

## Performance Testing

### Load Test with Apache Bench
```bash
# 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost:3000/health
```

### Load Test with wrk
```bash
# 4 threads, 100 connections, 30 seconds
wrk -t4 -c100 -d30s http://localhost:3000/health
```

### Load Test with Artillery
```bash
npm install -g artillery

artillery quick --count 100 --num 1000 http://localhost:3000/health
```

---

## Database Testing

### Connect to Database
```bash
psql -h localhost -U postgres -d brd_generator
```

### Check Tables
```sql
\dt
```

### Count Records
```sql
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'sources', COUNT(*) FROM sources
UNION ALL
SELECT 'requirements', COUNT(*) FROM requirements
UNION ALL
SELECT 'brd_documents', COUNT(*) FROM brd_documents;
```

### View Project with Requirements
```sql
SELECT p.id, p.name, COUNT(r.id) as requirement_count
FROM projects p
LEFT JOIN requirements r ON p.id = r.project_id
GROUP BY p.id, p.name;
```

### Check Source Citations
```sql
SELECT s.id, s.source_type, COUNT(r.id) as requirements_from_source
FROM sources s
LEFT JOIN requirements r ON s.id = r.source_id
GROUP BY s.id, s.source_type;
```

---

## Logging Testing

### Check Error Logs
```bash
tail -f logs/error.log
```

### Check Combined Logs
```bash
tail -f logs/combined.log
```

### Search Logs
```bash
grep "error" logs/combined.log
grep "project" logs/combined.log
```

---

## File Upload Testing

### Create Test File
```bash
echo "This is a test document with requirements. The system must support user authentication, payment processing, and real-time notifications." > test_doc.txt
```

### Upload File
```bash
curl -X POST http://localhost:3000/api/ingestion/upload \
  -F "file=@test_doc.txt" \
  -F "projectId=$PROJECT_ID" \
  -F "sourceType=document"
```

### Upload Large File
```bash
# Create 5MB file
dd if=/dev/zero of=large_file.txt bs=1M count=5

curl -X POST http://localhost:3000/api/ingestion/upload \
  -F "file=@large_file.txt" \
  -F "projectId=$PROJECT_ID" \
  -F "sourceType=document"
```

---

## Concurrent Operations Testing

### Create Multiple Projects Concurrently
```bash
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/projects \
    -H "Content-Type: application/json" \
    -d "{
      \"userId\": \"test-user-$i\",
      \"name\": \"Project $i\",
      \"description\": \"Concurrent test project $i\"
    }" &
done
wait
```

### Ingest Multiple Sources Concurrently
```bash
for i in {1..3}; do
  curl -X POST http://localhost:3000/api/ingestion/upload \
    -H "Content-Type: application/json" \
    -d "{
      \"projectId\": \"$PROJECT_ID\",
      \"sourceType\": \"email\",
      \"text\": \"Source $i content with requirements\"
    }" &
done
wait
```

---

## Cleanup

### Delete Test Data
```bash
# Delete all projects for test user
curl -X GET http://localhost:3000/api/projects/user/test-user-001 | jq -r '.[].id' | while read id; do
  curl -X DELETE http://localhost:3000/api/projects/$id
done
```

### Reset Database
```bash
npm run migrate
```

### Stop Services
```bash
docker-compose down
```

---

## Automated Testing (Future)

### Jest Setup
```bash
npm install --save-dev jest supertest
```

### Example Test
```javascript
const request = require('supertest');
const app = require('../src/index');

describe('Projects API', () => {
  it('should create a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        userId: 'test-user',
        name: 'Test Project'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
```

---

## Monitoring Checklist

- [ ] Health endpoint responds
- [ ] Database connection works
- [ ] LLM API calls succeed
- [ ] File uploads work
- [ ] Requirements extraction works
- [ ] BRD generation completes
- [ ] Edit operations work
- [ ] Delete operations work
- [ ] Error handling works
- [ ] Logging captures events
- [ ] Performance acceptable
- [ ] No memory leaks
- [ ] Database indexes working
- [ ] Concurrent operations safe
