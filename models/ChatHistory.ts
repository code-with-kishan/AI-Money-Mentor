import mongoose, { InferSchemaType, Model, model, models, Schema } from "mongoose";

const chatHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export type ChatHistoryDocument = InferSchemaType<typeof chatHistorySchema>;

export const ChatHistory: Model<ChatHistoryDocument> =
  (models.ChatHistory as Model<ChatHistoryDocument>) ||
  model<ChatHistoryDocument>("ChatHistory", chatHistorySchema);

export default mongoose.models.ChatHistory || ChatHistory;
