import userModel from "../models/userModels.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    // 🔹 Body se sirf prompt lo
    const { prompt } = req.body;

    // 🔹 UserId token se lo (auth middleware se)
    const userId = req.userId || req.body.userId;

    // ---------- VALIDATION ----------
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

    if (!user.creditBalance || user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance || 0,
      });
    }

    // ---------- CLIPDROP REQUEST ----------
    const formData = new FormData();
    formData.append("prompt", prompt);

    const clipdropRes = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // multipart boundary ke liye
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // ---------- IMAGE ko base64 me convert ----------
    const base64Image = Buffer.from(clipdropRes.data, "binary").toString(
      "base64"
    );
    const resultImage = `data:image/png;base64,${base64Image}`;

    // ---------- CREDIT UPDATE ----------
    user.creditBalance = (user.creditBalance || 0) - 1;
    await user.save();

    return res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance,
      resultImage,
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
