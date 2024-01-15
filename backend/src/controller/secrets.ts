import express from 'express'

import {
   createSecretModel,
   deleteSecretModel,
   getAllSecretsModel,
   getSecretByUserIdModel,
   updateSecretModel,
} from '../models/secrets'
import { verifyJWT } from '../utils/auth'

/**
 * @param req:
 * @param res: secrets
 * @returns: secrets
 */
export const getAllSecretsController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const secrets = await getAllSecretsModel()
      if (secrets.length === 0) {
         return res.status(400).json({
            message: 'No secrets found',
         })
      }
      res.json({
         message: 'Secrets found',
         secrets,
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

/**
 *
 * @param req: userId
 * @param res: secret
 * @returns: secret
 */
export const getSecretByUserIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const userId = req.params.id

      if (!userId) {
         return res.status(401).json({
            message: 'Unauthorized',
         })
      }

      const secret = await getSecretByUserIdModel(userId)
      if (!secret) {
         return res.status(404).json({
            message: 'Secret not found',
         })
      }

      res.json({
         id: secret._id,
         message: secret.secret,
         userId: secret.userId,
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

/**
 *
 * @param req: userId
 * @param res: message
 * @returns: message
 */
export const deleteSecretController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const userId = req.params.id
      if (!userId) {
         return res.status(401).json({
            message: 'Unauthorized',
         })
      }

      const secret = await getSecretByUserIdModel(userId)
      if (!secret) {
         return res.status(400).json({
            message: 'Secret not found',
         })
      }

      await deleteSecretModel(secret._id.toString())
      res.json({ message: 'Secret deleted successfully' })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

/**
 * @param req: userId, secret
 * @param res: message, updatedSecret
 * @returns: message, updatedSecret
 */
export const createOrUpdateSecretController = async (
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
      const secret = req.body.secret

      const secretExists = await getSecretByUserIdModel(userId)

      if (secretExists) {
         const updatedSecret = await updateSecretModel(userId, secret)
         res.json({
            message: 'Secret updated successfully',
            updatedSecret,
         })
      } else {
         const newSecret = await createSecretModel(secret, userId)
         res.json({
            message: 'Secret created successfully',
            newSecret,
         })
      }
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}
