import { model, Schema, Document } from "mongoose";

export interface IInstitution extends Document {
  _id: string;
  name: string;
  description: string;
  url: string;
  score: number;
  votes: number;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  email: string;
  logo: string;
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
    score: {
      type: Number,
      required: false, //init 0
    },
    votes: {
      type: Number,
      required: false, //init 0
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
    status: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  { timestamps: true }
);

export default model<IInstitution>("Institution", Institution);
