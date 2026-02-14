const express = require('express');
const brdController = require('../controllers/brdController');

const router = express.Router();

router.post('/generate/:projectId', brdController.generateBRD);
router.get('/:brdId', brdController.getBRD);
router.get('/project/:projectId', brdController.getBRDsByProject);
router.put('/:brdId/edit', brdController.editBRDSection);
router.delete('/:brdId', brdController.deleteBRD);

module.exports = router;
