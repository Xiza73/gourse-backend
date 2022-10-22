import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { IRole } from './Role';
import { IClient } from './Client';
import { IAdmin } from './Admin';
const { ObjectId } = Schema.Types

export interface IUser extends Document {
    _id: string,
    username: string,
    password: string,
    role: IRole,
    person: IClient | IAdmin,
    status: number,
    isPremium: boolean,
    comparePassword: (password: string) => Promise<boolean>
}

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    person: {
        type: ObjectId,
        refPath: 'onPerson',
        required: true
    },
    role: {
        type: ObjectId,
        ref: 'Role',
        required: true
    },
    onPerson: {
        type: String,
        required: true,
        enum: ['Client', 'Admin']
    },
    status: {
        type: Number,
        required: false,
        default: 1,
    },
    isPremium: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

User.pre<IUser>('save', async function(next){
    if(!this.isModified('password')) return next()
    //nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash;
    next();
})

User.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt)
    return hash;
}

export default model<IUser>('User', User);