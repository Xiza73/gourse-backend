import { model, Schema, Document } from 'mongoose'
import { IClient } from './Client';
const { ObjectId } = Schema.Types

export interface ISearch extends Document {
    _id: string,
    client: IClient,
    keywords: string,
}

const Search = new Schema({
    client: {
        type: ObjectId,
        ref: 'Client',
        required: true
    },
    keywords: [{
        type: String,
        required: true
    }]
}, { timestamps: true });


export default model<ISearch>('Search', Search);