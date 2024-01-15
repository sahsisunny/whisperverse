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
