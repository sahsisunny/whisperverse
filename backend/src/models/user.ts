import mongoose, { Types } from 'mongoose'
import { IUser } from 'types/user'

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple documents to have an empty username
      minlength: 5,
   },
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   passwordHash: {
      type: String,
   },
   googleId: {
      type: String,
   },
   timestamp: {
      type: Date,
      default: Date.now,
   },
})
export const UserModel = mongoose.model('User', userSchema)

export const getUserByUsernameModel = async (username: string) => {
   return await UserModel.findOne({ username })
}

export const getUserByEmailModel = async (email: string) => {
   return await UserModel.findOne({ email })
}

export const getUserByGoogleIdModel = async (googleId: string) => {
   return await UserModel.findOne({ googleId })
}

export const getUserIdByUsernameOrEmailModel = async (
   usernameOrEmail: string,
) => {
   const data = await UserModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
   })
   if (!data) {
      throw new Error('User not found')
   }
   return data._id
}

export const createUserModel = async (user: IUser) => {
   const newUser = new UserModel(user)
   return await newUser.save()
}

export const getAllUsers = async () => {
   return await UserModel.find({})
}

export const updateUserPasswordModel = async (
   userId: Types.ObjectId,
   passwordHash: string,
) => {
   const user = await UserModel.findById(userId)
   if (!user) {
      throw new Error('User not found')
   }
   user.passwordHash = passwordHash
   return await user.save()
}
