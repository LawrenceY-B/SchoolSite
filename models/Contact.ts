import mongoose, { Schema, type InferSchemaType } from "mongoose";

// Same shape and collection ("contacts") as the original Express backend, so old messages sit alongside new ones.
const contactSchema = new Schema(
  {
    Name: { type: String, required: true, trim: true, maxlength: 120 },
    Email: { type: String, required: true, trim: true, maxlength: 200 },
    Message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true },
);

export type ContactDoc = InferSchemaType<typeof contactSchema>;

export const Contact = mongoose.models.contact ?? mongoose.model("contact", contactSchema);
