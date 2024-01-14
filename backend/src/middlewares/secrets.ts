import express from 'express'
import Joi from 'joi'

export const createSecretValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      secret: Joi.string().required(),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}

export const updateSecretValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const requestUserId = req.params.id
   const schema = Joi.object({
      secret: Joi.string().required(),
      userId: Joi.string().required().valid(requestUserId),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}
