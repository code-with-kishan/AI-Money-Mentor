import mongoose, { InferSchemaType, Model, model, models, Schema } from "mongoose";

const financialDataSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    investments: { type: Number, required: true },
    goals: [
      {
        name: { type: String, required: true },
        target: { type: Number, required: true },
        years: { type: Number, required: true },
      },
    ],
    taxData: {
      annualSalary: { type: Number, required: true },
      deductions: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

export type FinancialDataDocument = InferSchemaType<typeof financialDataSchema>;

export const FinancialData: Model<FinancialDataDocument> =
  (models.FinancialData as Model<FinancialDataDocument>) ||
  model<FinancialDataDocument>("FinancialData", financialDataSchema);

export default mongoose.models.FinancialData || FinancialData;
