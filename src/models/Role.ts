import { model, Schema, Document } from 'mongoose'

export interface IRole extends Document {
    _id: string,
    description: string
}

const Role = new Schema({
    description: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, { timestamps: true });

export default model<IRole>('Role', Role);