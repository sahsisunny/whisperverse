import express from 'express'
import Joi from 'joi'

export const registerUserValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      username: Joi.string().min(5).required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}

export const validateLoginValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().min(8).required(),
   })
      .xor('email', 'username')
      .with('email', 'password')
      .with('username', 'password')

   const { error } = schema.validate(req.body)

   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }

   next()
}
