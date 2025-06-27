import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

categorySchema.virtual("products", {
  ref: "category",
  localField: "_id",
  foreignField: "category_id",
});

export const categoryCollect = model("category", categorySchema);
