const BRDDocument = require('../models/BRDDocument');
const logger = require('../config/logger');
const { callLLM } = require('../config/llm');
const requirementService = require('./requirementService');

class BRDService {
  async generateBRD(projectId, projectName) {
    try {
      // Fetch all requirements for the project
      const requirements = await requirementService.getRequirementsByProject(projectId);
      
      if (requirements.length === 0) {
        throw new Error('No requirements found for BRD generation');
      }

      // Group requirements by type
      const groupedReqs = this.groupRequirements(requirements);

      // Generate each section
      const sections = await this.generateSections(projectName, groupedReqs);

      // Create BRD document
      const brd = new BRDDocument({
        project_id: projectId,
        title: `BRD - ${projectName}`,
        executive_summary: sections.executiveSummary,
        business_objectives: sections.businessObjectives,
        stakeholders: groupedReqs.stakeholders.map(s => s.description),
        functional_requirements: groupedReqs.functional.map(f => f.description),
        non_functional_requirements: groupedReqs.nonFunctional.map(nf => nf.description),
        assumptions: sections.assumptions,
        risks: groupedReqs.risks.map(r => r.description),
        timeline: groupedReqs.timeline.map(t => t.description),
        success_metrics: sections.successMetrics,
        traceability_matrix: this.generateTraceabilityMatrix(requirements),
      });

      await brd.save();
      logger.info(`BRD generated: ${brd._id} for project ${projectId}`);
      return brd;
    } catch (error) {
      logger.error('Error generating BRD:', error);
      throw error;
    }
  }

  groupRequirements(requirements) {
    const grouped = {
      stakeholders: [],
      functional: [],
      nonFunctional: [],
      decisions: [],
      risks: [],
      timeline: [],
    };

    requirements.forEach(req => {
      switch (req.requirement_type) {
        case 'stakeholder':
          grouped.stakeholders.push(req);
          break;
        case 'functional':
          grouped.functional.push(req);
          break;
        case 'non_functional':
          grouped.nonFunctional.push(req);
          break;
        case 'decision':
          grouped.decisions.push(req);
          break;
        case 'risk':
          grouped.risks.push(req);
          break;
        case 'timeline':
          grouped.timeline.push(req);
          break;
      }
    });

    return grouped;
  }

  async generateSections(projectName, groupedReqs) {
    try {
      const prompt = `Generate a professional Business Requirements Document for project: "${projectName}"
      
Stakeholders: ${groupedReqs.stakeholders.map(s => s.description).join(', ')}
Functional Requirements: ${groupedReqs.functional.map(f => f.description).join(', ')}
Non-Functional Requirements: ${groupedReqs.nonFunctional.map(nf => nf.description).join(', ')}
Decisions: ${groupedReqs.decisions.map(d => d.description).join(', ')}
Risks: ${groupedReqs.risks.map(r => r.description).join(', ')}

Generate a JSON response with:
{
  "executiveSummary": "2-3 paragraph summary",
  "businessObjectives": "key business objectives",
  "assumptions": ["list of assumptions"],
  "successMetrics": ["list of success metrics"]
}`;

      const response = await callLLM(prompt);
      return JSON.parse(response);
    } catch (error) {
      logger.error('Error generating BRD sections:', error);
      throw error;
    }
  }

  generateTraceabilityMatrix(requirements) {
    return requirements.map(req => ({
      id: req._id.toString(),
      type: req.requirement_type,
      title: req.title,
      source: req.source_id ? req.source_id.toString() : null,
      status: req.status,
    }));
  }

  async getBRDById(brdId) {
    try {
      const brd = await BRDDocument.findById(brdId).populate('project_id');
      return brd;
    } catch (error) {
      logger.error('Error fetching BRD:', error);
      throw error;
    }
  }

  async getBRDsByProject(projectId) {
    try {
      const brds = await BRDDocument.find({ project_id: projectId }).sort({ createdAt: -1 });
      return brds;
    } catch (error) {
      logger.error('Error fetching BRDs:', error);
      throw error;
    }
  }

  async editBRDSection(brdId, sectionName, editRequest) {
    try {
      const brd = await this.getBRDById(brdId);
      if (!brd) throw new Error('BRD not found');

      const currentContent = brd[sectionName];
      const prompt = `Current ${sectionName}: ${currentContent}\n\nEdit request: ${editRequest}\n\nProvide the updated ${sectionName} content.`;
      
      const newContent = await callLLM(prompt);

      // Update BRD
      const updateData = { [sectionName]: newContent };
      const updatedBrd = await BRDDocument.findByIdAndUpdate(brdId, updateData, { new: true });

      logger.info(`BRD section edited: ${sectionName} in ${brdId}`);
      return updatedBrd;
    } catch (error) {
      logger.error('Error editing BRD section:', error);
      throw error;
    }
  }

  async deleteBRD(brdId) {
    try {
      await BRDDocument.findByIdAndDelete(brdId);
      logger.info(`BRD deleted: ${brdId}`);
      return { success: true };
    } catch (error) {
      logger.error('Error deleting BRD:', error);
      throw error;
    }
  }
}

module.exports = new BRDService();
