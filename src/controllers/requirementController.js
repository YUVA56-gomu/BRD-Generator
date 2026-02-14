const requirementService = require('../services/requirementService');
const logger = require('../config/logger');

class RequirementController {
  async getRequirements(req, res) {
    try {
      const { projectId } = req.params;
      const requirements = await requirementService.getRequirementsByProject(projectId);
      res.json(requirements);
    } catch (error) {
      logger.error('Error in getRequirements:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getRequirementsByType(req, res) {
    try {
      const { projectId, type } = req.params;
      const requirements = await requirementService.getRequirementsByType(projectId, type);
      res.json(requirements);
    } catch (error) {
      logger.error('Error in getRequirementsByType:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateRequirement(req, res) {
    try {
      const { requirementId } = req.params;
      const updates = req.body;

      const requirement = await requirementService.updateRequirement(requirementId, updates);
      res.json(requirement);
    } catch (error) {
      logger.error('Error in updateRequirement:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRequirement(req, res) {
    try {
      const { requirementId } = req.params;
      await requirementService.deleteRequirement(requirementId);
      res.json({ success: true });
    } catch (error) {
      logger.error('Error in deleteRequirement:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RequirementController();
