import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const categoryCollect = model("category", categorySchema);
