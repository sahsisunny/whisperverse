import { Types } from 'mongoose'

export interface IUser {
   _id?: Types.ObjectId
   username?: string
   name: string
   email: string
   passwordHash?: string
   googleId?: string
}

export interface IUserPayloadForToken {
   userId: Types.ObjectId
   username: string
   name: string
   email: string
}
