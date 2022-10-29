import { model, Schema, Document } from "mongoose";
import { ICourse } from './Course';

const { ObjectId } = Schema.Types;

export interface IClientCourse extends Document {
  _id: string;
  course: ICourse;
  isFavorite: boolean;
  isCompleted: boolean;
  score: number;
}

const ClientCourse = new Schema(
  {
    course: {
      type: ObjectId,
      ref: "Course",
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IClientCourse>("ClientCourse", ClientCourse);
