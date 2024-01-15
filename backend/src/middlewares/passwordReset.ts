import express from 'express'
import Joi from 'joi'

export const passwordResetValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      resetToken: Joi.string().required(),
      newPassword: Joi.string().min(8).required(),
      email: Joi.string().email(),
      username: Joi.string(),
   }).or('email', 'username')

   const { error } = schema.validate(req.body)

   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }

   next()
}
