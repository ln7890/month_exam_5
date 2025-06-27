import { model, Schema } from "mongoose";

const clienSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    hashedPassword: { type: String, required: true },
  },
  { timestamps: true }
);

export const clientCollection = model("client", clienSchema);
