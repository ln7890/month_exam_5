import { model, Schema } from "mongoose";

const soldPro = new Schema(
  {
    product_id: { type: Number, required: true },
    client_id: { type: Number, required: true },
    quantity: { type: String, required: true },
    phone: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const soldProCollection = model("soldproducts", soldPro);
