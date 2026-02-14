const fs = require('fs');
const path = require('path');
const pool = require('../../config/database');
const logger = require('../../config/logger');

const runMigrations = async () => {
  try {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schema);
    logger.info('Database schema initialized successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();
