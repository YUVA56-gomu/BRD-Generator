const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    source_type: {
      type: String,
      enum: ['email', 'slack', 'meeting_transcript', 'document', 'other'],
      required: true,
    },
    source_text: {
      type: String,
      required: true,
    },
    file_name: {
      type: String,
    },
    file_path: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Source', sourceSchema);
