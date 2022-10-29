import { model, Schema, Document } from "mongoose";
import { IClient } from "./Client";

const { ObjectId } = Schema.Types;

export interface IComment extends Document {
  _id: string;
  client: IClient;
}

const Comment = new Schema(
  {
    client: {
      type: ObjectId,
      ref: "Client",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", Comment);
