const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

router.post('/', sellerController.createSeller);
router.get('/profile', sellerAuthMiddleware, sellerController.getSellerProfile);
router.patch('/', sellerAuthMiddleware, sellerController.updateSeller);


module.exports = router;