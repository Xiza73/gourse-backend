import { model, Schema, Document } from "mongoose";
import { IComment } from "./Comment";

const { ObjectId } = Schema.Types;

export interface IInstitution extends Document {
  _id: string;
  name: string;
  description: string;
  url: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  email: string;
  logo: string;
  comments: IComment[];
  score: number;
  votes: number;
  status: number;
}

const Institution = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    social: {
      facebook: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    votes: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  { timestamps: true }
);

export default model<IInstitution>("Institution", Institution);
