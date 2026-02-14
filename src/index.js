const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const logger = require('./config/logger');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const projectRoutes = require('./routes/projectRoutes');
const ingestionRoutes = require('./routes/ingestionRoutes');
const requirementRoutes = require('./routes/requirementRoutes');
const brdRoutes = require('./routes/brdRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/ingestion', ingestionRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/brds', brdRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
