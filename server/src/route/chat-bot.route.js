import express from "express";
import { getResponses } from "../controller/chat-bot.controller.js";
export const chatBotRouter = express();

chatBotRouter.post("/response", getResponses);
