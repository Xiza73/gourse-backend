import { model, Schema, Document } from "mongoose";
const { ObjectId } = Schema.Types;

export interface IAdmin extends Document {
  _id: string;
  name: string;
  email: string;
  description: string;
}

const Admin = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<IAdmin>("Admin", Admin);
