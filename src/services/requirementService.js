const Requirement = require('../models/Requirement');
const logger = require('../config/logger');
const { callLLM } = require('../config/llm');

class RequirementService {
  async extractRequirements(projectId, sourceId, sourceText) {
    try {
      const systemPrompt = `You are an expert business analyst. Extract requirements from the provided text and return a JSON object with the following structure:
{
  "stakeholders": ["list of stakeholders"],
  "functional_requirements": ["list of functional requirements"],
  "non_functional_requirements": ["list of non-functional requirements"],
  "decisions": ["list of key decisions"],
  "risks": ["list of identified risks"],
  "timeline": ["list of timeline items"]
}`;

      const response = await callLLM(sourceText, systemPrompt);
      const extractedData = JSON.parse(response);

      const requirements = [];

      // Store stakeholders
      for (const stakeholder of extractedData.stakeholders || []) {
        const req = await this.storeRequirement(
          projectId,
          'stakeholder',
          stakeholder,
          stakeholder,
          sourceId
        );
        requirements.push(req);
      }

      // Store functional requirements
      for (const fr of extractedData.functional_requirements || []) {
        const req = await this.storeRequirement(
          projectId,
          'functional',
          fr,
          fr,
          sourceId
        );
        requirements.push(req);
      }

      // Store non-functional requirements
      for (const nfr of extractedData.non_functional_requirements || []) {
        const req = await this.storeRequirement(
          projectId,
          'non_functional',
          nfr,
          nfr,
          sourceId
        );
        requirements.push(req);
      }

      // Store decisions
      for (const decision of extractedData.decisions || []) {
        const req = await this.storeRequirement(
          projectId,
          'decision',
          decision,
          decision,
          sourceId
        );
        requirements.push(req);
      }

      // Store risks
      for (const risk of extractedData.risks || []) {
        const req = await this.storeRequirement(
          projectId,
          'risk',
          risk,
          risk,
          sourceId
        );
        requirements.push(req);
      }

      logger.info(`Extracted ${requirements.length} requirements from source ${sourceId}`);
      return requirements;
    } catch (error) {
      logger.error('Error extracting requirements:', error);
      throw error;
    }
  }

  async storeRequirement(projectId, requirementType, title, description, sourceId = null) {
    try {
      const requirement = new Requirement({
        project_id: projectId,
        requirement_type: requirementType,
        title,
        description,
        source_id: sourceId,
      });
      await requirement.save();
      return requirement;
    } catch (error) {
      logger.error('Error storing requirement:', error);
      throw error;
    }
  }

  async getRequirementsByProject(projectId) {
    try {
      const requirements = await Requirement.find({ project_id: projectId }).sort({ createdAt: -1 });
      return requirements;
    } catch (error) {
      logger.error('Error fetching requirements:', error);
      throw error;
    }
  }

  async getRequirementsByType(projectId, requirementType) {
    try {
      const requirements = await Requirement.find({
        project_id: projectId,
        requirement_type: requirementType,
      }).sort({ createdAt: -1 });
      return requirements;
    } catch (error) {
      logger.error('Error fetching requirements by type:', error);
      throw error;
    }
  }

  async updateRequirement(requirementId, updates) {
    try {
      const requirement = await Requirement.findByIdAndUpdate(requirementId, updates, { new: true });
      return requirement;
    } catch (error) {
      logger.error('Error updating requirement:', error);
      throw error;
    }
  }

  async deleteRequirement(requirementId) {
    try {
      await Requirement.findByIdAndDelete(requirementId);
      logger.info(`Requirement deleted: ${requirementId}`);
      return { success: true };
    } catch (error) {
      logger.error('Error deleting requirement:', error);
      throw error;
    }
  }
}

module.exports = new RequirementService();
