import { model, Schema, Types } from "mongoose";

const soldPro = new Schema(
  {
    product_id: {
      type: Types.ObjectId,
      ref: "productsforsale",
      required: true,
    },
    client_id: { type: Types.ObjectId, ref: "client", required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const soldProCollection = model("soldproducts", soldPro);
