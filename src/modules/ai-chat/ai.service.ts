import { IAIChatRequest } from "./ai.types";
import { productService } from "../product/product.service";

const sendMessage = async (payload: IAIChatRequest) => {
  const message = payload.message.trim().toLowerCase();
  
  const searchTerm = message
  .replace(/can you|please|find|show me|search for|a product|product/gi, "")
  .replace(/[?.,!]/g, "")
  .trim();

  console.log("USER MESSAGE:", message);
  console.log("SEARCH TERM:", searchTerm);

const products = await productService.searchProductsForAI(searchTerm);

console.log("PRODUCT COUNT:", products.length);

  let reply =
  "I'm Nexora AI Assistant. How can I help you with your shopping today?";

  if (products.length > 0) {
    const productList = products
      .map(
        (product) =>
          `${product.name} - $${product.price} (${product.stock} in stock)`
      )
      .join("\n");
  
    reply = `I found these products for you:\n${productList}`;
  }
  
  if (products.length > 0) {
    return {
      reply,
    };
  }

  if (message.includes("hello") || message.includes("hi")) {
    reply =
      "Hello! 👋 Welcome to Nexora. I can help you find products, compare products, check orders, and assist with your shopping.";
    } else if (message.includes("product") && products.length === 0) {
      reply =
        "I couldn't find any matching products. Please try another product name or requirement.";
    } else if (message.includes("order")) {
    reply =
      "I can help you with your order. Please provide your order information so I can assist you.";
  } else if (message.includes("cart")) {
    reply =
      "I can help you manage your shopping cart, including checking products and quantities.";
  } else if (message.includes("recommend")) {
    reply =
      "I'd be happy to recommend products. Tell me your preferred product type, budget, or requirements.";
  }

  return {
    reply,
  };
};

export const aiChatService = {
  sendMessage,
};