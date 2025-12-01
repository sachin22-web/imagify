import userModel from "../models/userModels.js";
import FormData from "form-data";
import axios from "axios";

const IMAGE_COUNT = 5;

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId || req.body.userId;

    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing details (user or prompt)",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.creditBalance || user.creditBalance < IMAGE_COUNT) {
      return res.status(400).json({
        success: false,
        message: `You need at least ${IMAGE_COUNT} credits to generate images. You have ${user.creditBalance || 0} credits.`,
        creditBalance: user.creditBalance || 0,
      });
    }

    const generateSingleImage = async () => {
      const formData = new FormData();
      formData.append("prompt", prompt);

      const clipdropRes = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            "x-api-key": process.env.CLIPDROP_API,
          },
          responseType: "arraybuffer",
        }
      );

      const base64Image = Buffer.from(clipdropRes.data, "binary").toString(
        "base64"
      );
      return `data:image/png;base64,${base64Image}`;
    };

    const imagePromises = Array(IMAGE_COUNT).fill(null).map(() => generateSingleImage());
    const resultImages = await Promise.all(imagePromises);

    user.creditBalance = (user.creditBalance || 0) - IMAGE_COUNT;
    await user.save();

    return res.json({
      success: true,
      message: `${IMAGE_COUNT} Images Generated`,
      creditBalance: user.creditBalance,
      resultImages,
    });
  } catch (error) {
    console.error(
      "generateImage error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Image generation failed",
    });
  }
};
