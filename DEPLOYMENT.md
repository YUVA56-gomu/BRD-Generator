# Deployment Guide

## Local Development

### Quick Start with Docker

1. Start PostgreSQL and ChromaDB:
```bash
docker-compose up -d
```

2. Install dependencies:
```bash
npm install
```

3. Initialize database:
```bash
npm run migrate
```

4. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Production Deployment

### Environment Setup

1. Create production `.env` file with:
```
NODE_ENV=production
PORT=3000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=brd_generator
DB_USER=prod_user
DB_PASSWORD=strong_password
OPENAI_API_KEY=your_key
LLM_PROVIDER=openai
CHROMA_HOST=your-chroma-host
CHROMA_PORT=8000
```

### Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE brd_generator;
CREATE USER prod_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE brd_generator TO prod_user;
```

2. Run migrations:
```bash
npm run migrate
```

### Docker Deployment

1. Build image:
```bash
docker build -t brd-generator:latest .
```

2. Run container:
```bash
docker run -d \
  --name brd-generator \
  -p 3000:3000 \
  --env-file .env \
  -v logs:/app/logs \
  brd-generator:latest
```

### Kubernetes Deployment

1. Create ConfigMap for environment:
```bash
kubectl create configmap brd-config --from-env-file=.env
```

2. Create Secret for sensitive data:
```bash
kubectl create secret generic brd-secrets \
  --from-literal=db-password=strong_password \
  --from-literal=openai-key=your_key
```

3. Apply deployment:
```bash
kubectl apply -f k8s/deployment.yaml
```

### PM2 Deployment

1. Install PM2:
```bash
npm install -g pm2
```

2. Start application:
```bash
pm2 start src/index.js --name "brd-generator"
```

3. Save PM2 config:
```bash
pm2 save
pm2 startup
```

## Monitoring

### Health Check
```bash
curl http://localhost:3000/health
```

### Logs
```bash
# Development
tail -f logs/combined.log

# PM2
pm2 logs brd-generator

# Docker
docker logs -f brd-generator
```

## Scaling Considerations

1. **Database**: Use connection pooling (already configured)
2. **Load Balancing**: Use Nginx or AWS ALB
3. **Caching**: Consider Redis for frequently accessed data
4. **Vector Store**: Scale ChromaDB separately
5. **File Storage**: Use S3 or similar for uploaded files

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong database passwords
- [ ] Rotate API keys regularly
- [ ] Enable CORS only for trusted domains
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Set up monitoring and alerts
- [ ] Use rate limiting
- [ ] Enable request logging
- [ ] Regular security updates

## Backup Strategy

### Database Backup
```bash
pg_dump -h localhost -U postgres brd_generator > backup.sql
```

### Restore
```bash
psql -h localhost -U postgres brd_generator < backup.sql
```

## Performance Optimization

1. Add database indexes (already included in schema)
2. Enable query caching
3. Use CDN for static assets
4. Implement request rate limiting
5. Monitor slow queries
6. Optimize LLM API calls

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql -h localhost -U postgres -d brd_generator
```

### LLM API Errors
- Check API key validity
- Verify rate limits
- Check network connectivity

### File Upload Issues
- Verify upload directory permissions
- Check disk space
- Verify file size limits

## Rollback Procedure

1. Keep previous version tagged
2. Use database migrations for schema changes
3. Test rollback in staging first
4. Have backup ready before deployment
