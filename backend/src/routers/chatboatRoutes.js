const express = require('express');
const ChatboatController = require('../controllers/ChatboatController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post('/', ChatboatController.simpleChat);
router.post('/product/:productId', ChatboatController.askProductQuestionController);
router.post('/multimodal', upload.single('image'), ChatboatController.multimodalChat);

module.exports = router;