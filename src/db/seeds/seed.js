const pool = require('../../config/database');
const logger = require('../../config/logger');
const { v4: uuidv4 } = require('uuid');

const seedDatabase = async () => {
  try {
    const userId = uuidv4();
    const projectId = uuidv4();

    // Insert sample user
    await pool.query(
      'INSERT INTO users (id, email, name) VALUES ($1, $2, $3)',
      [userId, 'demo@example.com', 'Demo User']
    );

    // Insert sample project
    await pool.query(
      'INSERT INTO projects (id, user_id, name, description) VALUES ($1, $2, $3, $4)',
      [projectId, userId, 'Sample Project', 'A sample project for testing']
    );

    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
