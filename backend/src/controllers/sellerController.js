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



 async getAllSellers(req, res) {
        try {
            const { status } = req.query; // ?status=APPROVED / PENDING / REJECTED
            const sellers = await SellerService.getAllSellers(status);
            res.status(200).json(sellers);
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async updateSellerAccountStatus(req, res) {
        try {
            const { id, status } = req.params; // /sellers/:id/:status
            const updatedSeller = await SellerService.updateSellerAccountStatus(id, status);
            res.status(200).json(updatedSeller);
        } catch (err) {
            res.status(err instanceof SellerError ? 404 : 500).json({ message: err.message });
        }
    }




}
module.exports = new SellerController();