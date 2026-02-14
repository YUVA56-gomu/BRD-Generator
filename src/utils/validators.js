const Joi = require('joi');

const projectSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
});

const ingestionSchema = Joi.object({
  projectId: Joi.string().uuid().required(),
  sourceType: Joi.string().valid('email', 'slack', 'meeting_transcript', 'document', 'other').required(),
  text: Joi.string().optional(),
});

const requirementSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'critical').optional(),
  status: Joi.string().valid('draft', 'approved', 'rejected').optional(),
});

const brdEditSchema = Joi.object({
  sectionName: Joi.string().required(),
  editRequest: Joi.string().min(10).required(),
});

const validate = (data, schema) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map(d => d.message);
    throw new Error(`Validation error: ${messages.join(', ')}`);
  }
  return value;
};

module.exports = {
  projectSchema,
  ingestionSchema,
  requirementSchema,
  brdEditSchema,
  validate,
};
