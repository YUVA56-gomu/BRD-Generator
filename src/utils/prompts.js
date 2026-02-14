// LLM Prompt Templates

const EXTRACTION_SYSTEM_PROMPT = `You are an expert business analyst specializing in requirements extraction. 
Your task is to analyze communication data and extract structured requirements.
Return responses as valid JSON only, with no additional text.`;

const EXTRACTION_USER_PROMPT = (sourceText) => `
Extract requirements from the following text and return a JSON object:

${sourceText}

Return JSON with this structure:
{
  "stakeholders": ["list of identified stakeholders"],
  "functional_requirements": ["list of functional requirements"],
  "non_functional_requirements": ["list of non-functional requirements"],
  "decisions": ["list of key decisions"],
  "risks": ["list of identified risks"],
  "timeline": ["list of timeline items or milestones"]
}`;

const BRD_GENERATION_SYSTEM_PROMPT = `You are an expert technical writer specializing in Business Requirements Documents.
Generate professional, comprehensive BRD sections based on extracted requirements.
Return responses as valid JSON only.`;

const BRD_GENERATION_USER_PROMPT = (projectName, requirements) => `
Generate a professional BRD for project: "${projectName}"

Requirements Summary:
${JSON.stringify(requirements, null, 2)}

Generate a JSON response with:
{
  "executiveSummary": "2-3 paragraph executive summary highlighting key business value",
  "businessObjectives": "Clear business objectives and goals",
  "assumptions": ["list of key assumptions"],
  "successMetrics": ["list of measurable success criteria"]
}`;

const BRD_EDIT_SYSTEM_PROMPT = `You are an expert technical writer. 
Edit BRD sections based on user feedback while maintaining professional quality and consistency.
Return only the updated section content.`;

const BRD_EDIT_USER_PROMPT = (sectionName, currentContent, editRequest) => `
Current ${sectionName}:
${currentContent}

Edit request: ${editRequest}

Provide the updated ${sectionName} content that incorporates the requested changes while maintaining professional quality.`;

module.exports = {
  EXTRACTION_SYSTEM_PROMPT,
  EXTRACTION_USER_PROMPT,
  BRD_GENERATION_SYSTEM_PROMPT,
  BRD_GENERATION_USER_PROMPT,
  BRD_EDIT_SYSTEM_PROMPT,
  BRD_EDIT_USER_PROMPT,
};
