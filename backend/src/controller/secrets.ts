import express from 'express'

import {
   createSecretModel,
   deleteSecretModel,
   getAllSecretsModel,
   getSecretByUserIdModel,
   updateSecretModel,
} from '../models/secrets'

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
      res.json({
         message: 'Secret found',
         secret,
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}

/**
 *
 * @param req:  secret
 * @param res: message, newSecret
 * @returns: message, newSecret
 */
export const createSecretController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const secret = req.body.secret
      const userId = res.locals.userId
      const secretExists = await getSecretByUserIdModel(userId)
      if (secretExists) {
         return res.status(400).json({
            message: 'Secret already exists',
         })
      }

      const newSecret = await createSecretModel(secret, userId)
      res.json({
         message: 'Secret created successfully',
         newSecret,
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
 *
 * @param req : userId, secret
 * @param res: newSecret
 * @returns: newSecret
 */
export const updateSecretController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const userId = req.params.id
      const secret = req.body.secret

      if (!userId) {
         return res.status(401).json({
            message: 'Unauthorized',
         })
      }

      if (!secret) {
         return res.status(400).json({
            message: 'Secret is required',
         })
      }

      const newSecret = await updateSecretModel(userId, secret)
      res.json({
         message: 'Secret updated successfully',
         newSecret,
      })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}
