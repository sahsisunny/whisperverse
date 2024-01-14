import express from 'express'
import {
   createPasswordResetModel,
   getPasswordResetByUserId,
   deletePasswordResetModel,
} from '../models/passwordReset'
import { verifyJWT, generateResetToken } from '../utils/auth'

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
         return res.status(400).json({
            message: 'Password reset already exists',
            passwordReset: existingPasswordReset,
         })
      }
      const resetToken = await generateResetToken()
      const newPasswordReset = await createPasswordResetModel(
         userId,
         resetToken,
      )

      res.status(201).json({
         message: 'Password reset created successfully',
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
            .json({ message: 'No password reset data found' })
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
         message: 'Password reset deleted successfully',
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}
