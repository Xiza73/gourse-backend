import { model, Schema, Document } from 'mongoose'
import { IInstitution } from './Institution';

const { ObjectId } = Schema.Types

export interface ICourse extends Document {
    _id: string,
    institution: IInstitution,
    name: string,
    description: string,
    image: string,
    price: number,
    currency: string,
    start: string,
    duration: string,
    schedule: string,
    url: string,
    score: number,
    votes: number,
    status: number
}

const Course = new Schema({
    institution: {
        type: ObjectId,
        ref: 'Institution',
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: false
    },
    schedule: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: false //init 0
    },
    votes: {
        type: Number,
        required: false //init 0
    },
    status: {
        type: Number,
        required: false,
        default: 1,
    }
}, { timestamps: true });


export default model<ICourse>('Course', Course);