const Project = require('../models/Project');
const logger = require('../config/logger');

class ProjectService {
  async createProject(userId, name, description) {
    try {
      const project = new Project({
        user_id: userId,
        name,
        description,
      });
      await project.save();
      logger.info(`Project created: ${project._id}`);
      return project;
    } catch (error) {
      logger.error('Error creating project:', error);
      throw error;
    }
  }

  async getProjectById(projectId) {
    try {
      const project = await Project.findById(projectId).populate('user_id');
      return project;
    } catch (error) {
      logger.error('Error fetching project:', error);
      throw error;
    }
  }

  async listProjects(userId) {
    try {
      const projects = await Project.find({ user_id: userId }).sort({ createdAt: -1 });
      return projects;
    } catch (error) {
      logger.error('Error listing projects:', error);
      throw error;
    }
  }

  async updateProject(projectId, updates) {
    try {
      const project = await Project.findByIdAndUpdate(projectId, updates, { new: true });
      logger.info(`Project updated: ${projectId}`);
      return project;
    } catch (error) {
      logger.error('Error updating project:', error);
      throw error;
    }
  }

  async deleteProject(projectId) {
    try {
      await Project.findByIdAndDelete(projectId);
      logger.info(`Project deleted: ${projectId}`);
      return { success: true };
    } catch (error) {
      logger.error('Error deleting project:', error);
      throw error;
    }
  }
}

module.exports = new ProjectService();
