const ingestionService = require('../services/ingestionService');
const requirementService = require('../services/requirementService');
const logger = require('../config/logger');
const fs = require('fs');

class IngestionController {
  async uploadDocument(req, res) {
    try {
      const { projectId, sourceType } = req.body;
      
      if (!projectId || !sourceType) {
        return res.status(400).json({ error: 'projectId and sourceType are required' });
      }

      let sourceText = '';
      let fileName = null;
      let filePath = null;

      // Handle file upload
      if (req.file) {
        fileName = req.file.originalname;
        filePath = req.file.path;
        sourceText = fs.readFileSync(filePath, 'utf8');
      } else if (req.body.text) {
        sourceText = req.body.text;
      } else {
        return res.status(400).json({ error: 'Either file or text content is required' });
      }

      // Store source
      const source = await ingestionService.storeSource(
        projectId,
        sourceType,
        sourceText,
        fileName,
        filePath
      );

      // Extract requirements
      const requirements = await requirementService.extractRequirements(
        projectId,
        source._id,
        sourceText
      );

      res.status(201).json({
        source,
        requirements,
        message: `Ingested ${requirements.length} requirements from source`
      });
    } catch (error) {
      logger.error('Error in uploadDocument:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getSources(req, res) {
    try {
      const { projectId } = req.params;
      const sources = await ingestionService.getSourcesByProject(projectId);
      res.json(sources);
    } catch (error) {
      logger.error('Error in getSources:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getSource(req, res) {
    try {
      const { sourceId } = req.params;
      const source = await ingestionService.getSourceById(sourceId);
      
      if (!source) {
        return res.status(404).json({ error: 'Source not found' });
      }

      res.json(source);
    } catch (error) {
      logger.error('Error in getSource:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSource(req, res) {
    try {
      const { sourceId } = req.params;
      await ingestionService.deleteSource(sourceId);
      res.json({ success: true });
    } catch (error) {
      logger.error('Error in deleteSource:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new IngestionController();
