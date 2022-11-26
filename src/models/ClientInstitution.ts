import { model, Schema, Document } from "mongoose";
import { IUser } from './User';

const { ObjectId } = Schema.Types;

export interface IClientInstitution extends Document {
  _id: string;
  user: IUser;
  institution: string;
  score: number;
  comment: string;
}

const ClientInstitution = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IClientInstitution>("ClientInstitution", ClientInstitution);
