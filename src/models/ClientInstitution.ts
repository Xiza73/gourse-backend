import { model, Schema, Document } from "mongoose";
import { IInstitution } from './Institution';

const { ObjectId } = Schema.Types;

export interface IClientInstitution extends Document {
  _id: string;
  institution: IInstitution;
  isFavorite: boolean;
  isCompleted: boolean;
  score: number;
}

const ClientInstitution = new Schema(
  {
    institution: {
      type: ObjectId,
      ref: "Institution",
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

export default model<IClientInstitution>("ClientInstitution", ClientInstitution);
