const express = require('express');
const multer = require('multer');
const ingestionController = require('../controllers/ingestionController');

const router = express.Router();
const upload = multer({ dest: process.env.UPLOAD_DIR || './uploads' });

router.post('/upload', upload.single('file'), ingestionController.uploadDocument);
router.get('/sources/:projectId', ingestionController.getSources);
router.get('/source/:sourceId', ingestionController.getSource);
router.delete('/source/:sourceId', ingestionController.deleteSource);

module.exports = router;
