import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const categoryCollec = model("category", categorySchema);
