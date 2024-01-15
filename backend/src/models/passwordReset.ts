import mongoose from 'mongoose'

const passwordResetSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
   },
   resetToken: {
      type: String,
      required: true,
   },
   timestamp: {
      type: Date,
      default: Date.now,
   },
})

export const PasswordResetModel = mongoose.model(
   'PasswordReset',
   passwordResetSchema,
)

export const createPasswordResetModel = async (
   userId: string,
   resetToken: string,
) => {
   const newPasswordReset = new PasswordResetModel({
      userId,
      resetToken,
   })
   return await newPasswordReset.save()
}

export const getPasswordResetByUserId = async (userId: string) => {
   return await PasswordResetModel.findOne({ userId })
}

export const deletePasswordResetModel = async (userId: string) => {
   return await PasswordResetModel.deleteMany({ userId })
}
