const brdService = require('../services/brdService');
const projectService = require('../services/projectService');
const logger = require('../config/logger');

class BRDController {
  async generateBRD(req, res) {
    try {
      const { projectId } = req.params;
      
      const project = await projectService.getProjectById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const brd = await brdService.generateBRD(projectId, project.name);
      res.status(201).json(brd);
    } catch (error) {
      logger.error('Error in generateBRD:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getBRD(req, res) {
    try {
      const { brdId } = req.params;
      const brd = await brdService.getBRDById(brdId);
      
      if (!brd) {
        return res.status(404).json({ error: 'BRD not found' });
      }

      res.json(brd);
    } catch (error) {
      logger.error('Error in getBRD:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getBRDsByProject(req, res) {
    try {
      const { projectId } = req.params;
      const brds = await brdService.getBRDsByProject(projectId);
      res.json(brds);
    } catch (error) {
      logger.error('Error in getBRDsByProject:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async editBRDSection(req, res) {
    try {
      const { brdId } = req.params;
      const { sectionName, editRequest } = req.body;

      if (!sectionName || !editRequest) {
        return res.status(400).json({ error: 'sectionName and editRequest are required' });
      }

      const brd = await brdService.editBRDSection(brdId, sectionName, editRequest);
      res.json(brd);
    } catch (error) {
      logger.error('Error in editBRDSection:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBRD(req, res) {
    try {
      const { brdId } = req.params;
      await brdService.deleteBRD(brdId);
      res.json({ success: true });
    } catch (error) {
      logger.error('Error in deleteBRD:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BRDController();
