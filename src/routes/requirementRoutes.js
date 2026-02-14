const express = require('express');
const requirementController = require('../controllers/requirementController');

const router = express.Router();

router.get('/:projectId', requirementController.getRequirements);
router.get('/:projectId/type/:type', requirementController.getRequirementsByType);
router.put('/:requirementId', requirementController.updateRequirement);
router.delete('/:requirementId', requirementController.deleteRequirement);

module.exports = router;
