const SellerService = require("../services/SellerService");
const SellerError = require("../exceptions/SellerError");

class SellerController {
  async createSeller(req, res) {
    try {
      const newSeller = await SellerService.createSeller(req.body);
   
      return res.status(201).json({ message: "Seller created successfully.", seller: newSeller });
    } catch (err) {
      return res.status(err instanceof SellerError ? 400 : 500).json({ error: err.message });
    }
  }
}
module.exports = new SellerController();