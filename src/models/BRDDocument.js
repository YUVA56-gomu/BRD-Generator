const mongoose = require('mongoose');

const brdDocumentSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    executive_summary: {
      type: String,
    },
    business_objectives: {
      type: String,
    },
    stakeholders: [String],
    functional_requirements: [String],
    non_functional_requirements: [String],
    assumptions: [String],
    risks: [String],
    timeline: [String],
    success_metrics: [String],
    traceability_matrix: [
      {
        id: String,
        type: String,
        title: String,
        source: String,
        status: String,
      },
    ],
    version: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['draft', 'approved', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BRDDocument', brdDocumentSchema);
