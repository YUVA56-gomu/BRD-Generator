const projectService = require('../services/projectService');
const logger = require('../config/logger');

class ProjectController {
  async createProject(req, res) {
    try {
      const { userId, name, description } = req.body;
      
      if (!userId || !name) {
        return res.status(400).json({ error: 'userId and name are required' });
      }

      const project = await projectService.createProject(userId, name, description);
      res.status(201).json(project);
    } catch (error) {
      logger.error('Error in createProject:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getProject(req, res) {
    try {
      const { projectId } = req.params;
      const project = await projectService.getProjectById(projectId);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      logger.error('Error in getProject:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async listProjects(req, res) {
    try {
      const { userId } = req.params;
      const projects = await projectService.listProjects(userId);
      res.json(projects);
    } catch (error) {
      logger.error('Error in listProjects:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateProject(req, res) {
    try {
      const { projectId } = req.params;
      const updates = req.body;

      const project = await projectService.updateProject(projectId, updates);
      res.json(project);
    } catch (error) {
      logger.error('Error in updateProject:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProject(req, res) {
    try {
      const { projectId } = req.params;
      await projectService.deleteProject(projectId);
      res.json({ success: true });
    } catch (error) {
      logger.error('Error in deleteProject:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();
