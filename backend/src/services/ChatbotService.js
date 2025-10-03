require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ProductService = require("./ProductService");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileToGenerativePart = (file) => {
  return {
    inlineData: {
      data: file.buffer.toString("base64"),
      mimeType: file.mimetype,
    },
  };
};

class ChatbotService {
  async chatService(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error("Failed to get response from AI service.");
    }
  }

  async askProductQuestion(productId, userQuestion) {
    try {
        const product = await ProductService.findProductById(productId);
        if (!product) {
            return "Sorry, the product you're asking about does not exist.";
        }
        const productDetails = JSON.stringify(product);

        const prompt = `You are an eCommerce assistant. Answer the customer's question based only on the product details below.\n--- PRODUCT DETAILS ---\n${productDetails}\n-----------------------\nQuestion: ${userQuestion}\nAnswer:`;
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        throw new Error("Failed to get AI response for product question.");
    }
  }

  async multimodalChatService(prompt, imageFile) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const imagePart = fileToGenerativePart(imageFile);
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error("Failed to get AI response for multimodal chat.");
    }
  }
}

module.exports = new ChatbotService();