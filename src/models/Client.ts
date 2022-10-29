import { model, Schema, Document } from "mongoose";

export interface IClient extends Document {
  _id: string;
  email: string;
  aboutMe: string;
  favorites: string[];
  complete: string[];
}

const Client = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    aboutMe: {
      type: String,
      unique: false,
      required: false,
    },
    favorites: [
      {
        type: String,
        required: false,
      },
    ],
    complete: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default model<IClient>("Client", Client);
