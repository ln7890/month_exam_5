import { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
    category_id: { type: Types.ObjectId, ref: "category", required: true },
    salesman_id: { type: Types.ObjectId, ref: "salesman", required: true },
  },
  { timestamps: true }
);

export const productsCollection = model("productsforsale", productSchema);
