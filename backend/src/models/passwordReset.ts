import mongoose, { Types } from 'mongoose'

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

export const updatePasswordResetModel = async (
   userId: string,
   resetToken: string,
) => {
   const newPasswordReset = await PasswordResetModel.findOne({ userId })
   if (!newPasswordReset) {
      throw new Error('Password reset token not found')
   }
   newPasswordReset.resetToken = resetToken
   return await newPasswordReset.save()
}
export const getPasswordResetByUserId = async (userId: Types.ObjectId) => {
   return await PasswordResetModel.findOne({ userId })
}

export const deletePasswordResetModel = async (userId: string) => {
   return await PasswordResetModel.deleteMany({ userId })
}
