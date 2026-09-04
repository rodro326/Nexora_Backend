import { Request, Response } from "express";
import { aiChatService } from "./ai.service";

const sendMessage = async (req: Request, res: Response) => {
  try {
    const result = await aiChatService.sendMessage(req.body);

    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const aiChatController = {
  sendMessage,
};