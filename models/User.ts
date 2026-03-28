import mongoose, { InferSchemaType, Model, model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    salary: { type: Number, required: true },
    expenses: { type: Number, required: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User: Model<UserDocument> =
  (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);

export default mongoose.models.User || User;
