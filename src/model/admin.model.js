import { model, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin"] },
  },
  { timestamps: true }
);

export const adminCollection = model("admin", adminSchema);
