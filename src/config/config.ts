import dotenv from 'dotenv'
dotenv.config()

export default {
    jwtSecret: process.env.jwtSecret ?? 'secretito',
    mongodb: process.env.mongodb ?? ' ',
    mongodbro: process.env.mongodbreadonly ?? ' ',
    mailUser: process.env.mailUser ?? ' ',
    mailPassword: process.env.mailPassword ?? ' ',
    clientUrl: process.env.clientUrl ?? ''
}   