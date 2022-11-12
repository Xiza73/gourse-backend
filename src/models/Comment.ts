import { model, Schema, Document } from "mongoose";
import { IUser } from './User';

const { ObjectId } = Schema.Types;

export interface IComment extends Document {
  _id: string;
  user: IUser;
  content: string;
  url: string;
}

const Comment = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", Comment);
