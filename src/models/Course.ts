import { model, Schema, Document } from "mongoose";
import { IInstitution } from "./Institution";
import { IComment } from './Comment';

const { ObjectId } = Schema.Types;

export interface ICourse extends Document {
  _id: string;
  name: string;
  institution: IInstitution;
  description: string;
  price: number;
  currency: string;
  schedule: string;
  image: string;
  start: string;
  duration: string;
  url: string;
  comments: IComment[];
  redirects: number;
  score: number;
  votes: number;
  status: number;
}

const Course = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
      trim: true,
    },
    institution: {
      type: ObjectId,
      ref: "Institution",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    start: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: false,
      default: "",
    },
    url: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    redirects: {
      type: Number,
      required: false,
      default: 0,
    },
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

export default model<ICourse>("Course", Course);
