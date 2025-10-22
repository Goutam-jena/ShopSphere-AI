
const express = require('express');
const ChatboatController = require('../controllers/ChatboatController');
const multer = require('multer'); // Import multer


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', ChatboatController.simpleChat);
router.post('/product/:productId', ChatboatController.askProductQuestionController);

// --- ADD THIS NEW ROUTE ---
// It uses multer middleware to process a single file named 'image'
router.post('/multimodal', upload.single('image'), ChatboatController.multimodalChat);
// --- END OF ADDITION ---

module.exports = router;