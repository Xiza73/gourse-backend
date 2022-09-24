import { model, Schema, Document } from 'mongoose'

export interface ISchedule extends Document {
    _id: string,
    date_start: Date,
    date_end: Date,
    day: number[],
    hour_start: string,
    hour_end: string,
}

const Schedule = new Schema({
    date_start: {
        type: Date,
        required: false
    },
    date_end: {
        type: Date,
        required: false
    },
    day: [{
        type: Number,
        required: true
    }],
    hour_start: {
        type: String,
        required: true
    },
    hour_end: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<ISchedule>('Schedule', Schedule);