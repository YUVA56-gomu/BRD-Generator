const Source = require('../models/Source');
const logger = require('../config/logger');

class IngestionService {
  async storeSource(projectId, sourceType, sourceText, fileName = null, filePath = null) {
    try {
      const source = new Source({
        project_id: projectId,
        source_type: sourceType,
        source_text: sourceText,
        file_name: fileName,
        file_path: filePath,
      });
      await source.save();
      logger.info(`Source stored: ${source._id} for project ${projectId}`);
      return source;
    } catch (error) {
      logger.error('Error storing source:', error);
      throw error;
    }
  }

  async getSourcesByProject(projectId) {
    try {
      const sources = await Source.find({ project_id: projectId }).sort({ createdAt: -1 });
      return sources;
    } catch (error) {
      logger.error('Error fetching sources:', error);
      throw error;
    }
  }

  async getSourceById(sourceId) {
    try {
      const source = await Source.findById(sourceId);
      return source;
    } catch (error) {
      logger.error('Error fetching source:', error);
      throw error;
    }
  }

  async deleteSource(sourceId) {
    try {
      await Source.findByIdAndDelete(sourceId);
      logger.info(`Source deleted: ${sourceId}`);
      return { success: true };
    } catch (error) {
      logger.error('Error deleting source:', error);
      throw error;
    }
  }
}

module.exports = new IngestionService();
