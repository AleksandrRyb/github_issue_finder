import mongoose from "mongoose";

const { Schema } = mongoose;

const logSchema = new Schema(
  {
    ip: {
      type: String,
    },
    type: {
      type: String,
      enum: ["GET_ISSUE", "GET_ISSUES"],
    },
    request: {
      type: Number,
    },
    statusCode: {
      type: Number,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("log", logSchema);
