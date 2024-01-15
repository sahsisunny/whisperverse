import express from 'express'

import {
   createPasswordResetModel,
   deletePasswordResetModel,
   getPasswordResetByUserId,
   updatePasswordResetModel,
} from '../models/passwordReset'
import {
   getUserIdByUsernameOrEmailModel,
   updateUserPasswordModel,
} from '../models/user'
import { generateHash, generateResetToken, verifyJWT } from '../utils/auth'

/**
 * @param req : userId
 * @param res : message, passwordReset (userId, resetToken)
 * @returns : 201, 500
 */
export const createPasswordResetController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const token = req.cookies['MOONWALKER-AUTH']
      const payload = await verifyJWT(token)

      if (typeof payload === 'string') {
         return res.status(401).json({ error: 'Unauthorized' })
      }

      const userId = payload.userId
      const existingPasswordReset = await getPasswordResetByUserId(userId)
      if (existingPasswordReset) {
         const resetToken = await generateResetToken()
         const updatedToken = await updatePasswordResetModel(userId, resetToken)
         return res.status(200).json({
            message: 'New Password reset token generated successfully',
            passwordReset: updatedToken,
         })
      }
      const resetToken = await generateResetToken()
      const newPasswordReset = await createPasswordResetModel(
         userId,
         resetToken,
      )

      res.status(201).json({
         message: 'Password reset token generated successfully',
         passwordReset: newPasswordReset,
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

export const getPasswordResetByTokenController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const token = req.cookies['MOONWALKER-AUTH']
      const payload = await verifyJWT(token)

      if (typeof payload === 'string') {
         return res.status(401).json({ error: 'Unauthorized' })
      }

      const userId = payload.userId

      const passwordReset = await getPasswordResetByUserId(userId)
      if (passwordReset === null) {
         return res
            .status(404)
            .json({ message: 'No password reset token found' })
      }

      res.status(200).json({
         message: 'Password reset retrieved successfully',
         passwordReset,
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

export const deletePasswordResetController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const token = req.cookies['MOONWALKER-AUTH']
      const payload = await verifyJWT(token)

      if (typeof payload === 'string') {
         return res.status(401).json({ error: 'Unauthorized' })
      }

      const userId = payload.userId

      await deletePasswordResetModel(userId)

      res.status(200).json({
         message: 'Password reset token deleted successfully',
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

export const passwordResetController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { resetToken, newPassword, username, email } = req.body
      const userId = await getUserIdByUsernameOrEmailModel(username || email)

      const existPasswordResetToken = await getPasswordResetByUserId(userId)
      if (existPasswordResetToken === null) {
         return res
            .status(404)
            .json({ message: 'No password reset token found' })
      }
      if (resetToken !== existPasswordResetToken.resetToken) {
         return res
            .status(401)
            .json({ message: 'Invalid password reset token' })
      }

      const passwordHash = await generateHash(newPassword)

      const updatedUserPassword = await updateUserPasswordModel(
         userId,
         passwordHash,
      )
      if (!updatedUserPassword) {
         return res.status(404).json({ message: 'User not found' })
      }
      res.status(200).json({
         message: 'Password reset successfully',
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}
