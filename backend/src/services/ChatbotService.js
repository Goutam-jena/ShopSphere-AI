

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ProductService = require("./ProductService");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileToGenerativePart = (file) => ({
  inlineData: {
    data: file.buffer.toString("base64"),
    mimeType: file.mimetype,
  },
});

class ChatbotService {
  constructor() {
  
    this.model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async chatService(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      // Access the response text safely
      return result?.response?.text() || "No response from AI.";
    } catch (error) {
      console.error("ERROR in chatService:", error);
      throw new Error("Failed to get response from AI service.");
    }
  }

  async askProductQuestion(productId, userQuestion) {
    try {
      const product = await ProductService.findProductById(productId);
      if (!product) return "Sorry, the product you're asking about does not exist.";

      const prompt = `
        You are an eCommerce assistant. Answer the customer's question based ONLY on the product details below.
        --- PRODUCT DETAILS ---
        ${JSON.stringify(product)}
        -----------------------
        Question: ${userQuestion}
        Answer:`;

      const result = await this.model.generateContent(prompt);
      return result?.response?.text() || "No response from AI.";
    } catch (error) {
      console.error("ERROR in askProductQuestion:", error);
      throw new Error("Failed to get response from AI service for product question.");
    }
  }

  async multimodalChatService(prompt, imageFile) {
    try {
      const imagePart = fileToGenerativePart(imageFile);
      const result = await this.model.generateContent([prompt, imagePart]);
      return result?.response?.text() || "No response from AI.";
    } catch (error) {
      console.error("ERROR in multimodalChatService:", error);
      throw new Error("Failed to get response from AI service for multimodal chat.");
    }
  }
}

module.exports = new ChatbotService();
