const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    requirement_type: {
      type: String,
      enum: ['functional', 'non_functional', 'stakeholder', 'decision', 'risk', 'timeline'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    source_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Source',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
    },
    status: {
      type: String,
      enum: ['draft', 'approved', 'rejected'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Requirement', requirementSchema);
