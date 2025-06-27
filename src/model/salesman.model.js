import { model, Schema } from "mongoose";

const salesmanSchema = new Schema(
  {
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);
salesmanSchema.virtual("sales", {
  ref: "product",
  localField: "_id",
  foreignField: "salesman_id",
});
export const salesmanCollection = model("salesman", salesmanSchema);
