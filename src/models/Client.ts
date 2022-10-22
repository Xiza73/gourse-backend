import { model, Schema, Document } from 'mongoose'

export interface IClient extends Document {
    _id: string,
    email: string,
    aboutMe: string,
    favorites: string[],
}

const Client = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    favorites: [{
        type: String,
        required: false
    }],
    aboutMe: {
        type: String,
        unique: false,
        required: false
    }
}, { timestamps: true });


export default model<IClient>('Client', Client);