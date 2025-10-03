const ChatbotService = require("../services/ChatbotService.js");

class ChatbotController {
  async simpleChat(req, res) {
    try {
      const message = req.body.message;
      const data = await ChatbotService.chatService(message);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async askProductQuestionController(req, res) {
    try {
      const { productId } = req.params;
      const { question } = req.body;
      const answer = await ChatbotService.askProductQuestion(productId, question);
      res.status(200).json({ answer });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async multimodalChat(req, res) {
    try {
      const message = req.body.message;
      const imageFile = req.file;
      if (!imageFile) {
        return res.status(400).json({ error: "Image file is required." });
      }
      const data = await ChatbotService.multimodalChatService(message, imageFile);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ChatbotController();