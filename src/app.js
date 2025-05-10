import express from "express";
import { getPlantResponse } from "./utils/ai-helper.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.post("/ai-chat", async (req, res) => {
  const { message } = req.body;

  try {
    const getAiResponse = await getPlantResponse(message);
    return res.status(200).json({
      chat: message,
      reply: getAiResponse
    })
  } catch (error) {
    throw new Error("Error")
  }
});



// Start the Express server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
