import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    plan: {
      type: String,
      required: true,
      enum: ["Basic", "Advanced", "Business"],
    },
    amount: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,   // ✅ yahan UNIQUE nahi hona chahiye
    },
    payment: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const transactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default transactionModel;
