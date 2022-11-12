import { model, Schema, Document } from "mongoose";
import { IUser } from "./User";

const { ObjectId } = Schema.Types;

export interface IClientCourse extends Document {
  _id: string;
  user: IUser;
  course: string;
  score: number;
  comment: string;
}

const ClientCourse = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    course: {
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

export default model<IClientCourse>("ClientCourse", ClientCourse);
