import express from 'express'

import {
   createUserModel,
   getUserByEmailModel,
   getUserByUsernameModel,
} from '../models/user'
import {
   compareHash,
   generateHash,
   generateJWT,
   verifyJWT,
} from '../utils/auth'
import { IUser } from 'types/user'
import passport from '../services/passport'
import { Error } from 'mongoose'

/**
 * Register a new user
 * @param req : username, name, email, password
 * @param res : message, user (username, name, email)
 * @returns
 */
export const registerController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { username, name, email, password } = req.body

      const existingEmail = await getUserByEmailModel(email)
      if (existingEmail) {
         return res.status(400).json({
            message: 'Email already exists',
         })
      }

      const existingUsername = await getUserByUsernameModel(username)
      if (existingUsername) {
         return res.status(400).json({
            message: 'Username already exists',
         })
      }

      const user = await createUserModel({
         username,
         name,
         email,
         passwordHash: await generateHash(password),
      })

      const payload = {
         userId: user._id,
         username: user.username,
         name: user.name,
         email: user.email,
      }

      const token = await generateJWT(payload)

      res.cookie('MOONWALKER-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(201).json({
         message: 'User created successfully',
         user: {
            username: user.username,
            name: user.name,
            email: user.email,
         },
      })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Login a user
 * @param req : username or email, password
 * @param res : message, user
 * @returns
 */
export const loginController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { username, email, password } = req.body

      let user: IUser
      if (username) {
         user = await getUserByUsernameModel(username)
      } else if (email) {
         user = await getUserByEmailModel(email)
      }

      if (!user) {
         return res.status(404).json({
            message: 'User does not exist',
         })
      }

      if (!user.passwordHash) {
         return res.status(404).json({
            message: 'Password not created',
         })
      }
      const passwordMatch = await compareHash(password, user.passwordHash)
      if (!passwordMatch) {
         return res.status(404).json({
            message: 'Password is incorrect',
         })
      }

      const payload = {
         userId: user._id,
         username: user.username,
         name: user.name,
         email: user.email,
      }

      const token = await generateJWT(payload)

      res.cookie('MOONWALKER-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(200).json({
         message: 'User logged in successfully',
         user: {
            username: user.username,
            name: user.name,
            email: user.email,
         },
      })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Logout a user
 * @param req : token
 * @param res : message
 * @returns
 */
export const logoutController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const token = req.cookies['MOONWALKER-AUTH']

      if (!token) {
         return res.status(401).json({
            message: 'Unauthorized: No session token',
         })
      }

      res.clearCookie('MOONWALKER-AUTH')

      //   redirect to /login
      return res.redirect('/')
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get current user
 * @param req : token
 * @param res : message, user
 * @returns
 */
export const getSelfController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const token = req.cookies['MOONWALKER-AUTH']

      if (!token) {
         return res.status(401).json({
            message: 'Unauthorized: No session token',
         })
      }

      const payload = await verifyJWT(token)

      if (typeof payload === 'string') {
         throw new Error('Token verification failed')
      }

      const user = await getUserByUsernameModel(payload.username)

      return res.status(200).json({
         id: user.id,
         username: user.username,
         name: user.name,
         email: user.email,
      })
   } catch (err) {
      console.error(err)
      return res
         .status(401)
         .json({ message: 'Unauthorized: Token verification failed' })
   }
}

// Create a controller for Google OAuth authentication
export const googleAuthController = passport.authenticate('google', {
   scope: ['profile', 'email'],
})

export const googleAuthCallbackController = (
   req: express.Request,
   res: express.Response,
) => {
   passport.authenticate('google', async (err: Error, user: IUser) => {
      if (err) {
         console.error(err)
         return res
            .status(401)
            .json({ message: 'Google authentication failed' })
      }

      if (!user) {
         return res
            .status(401)
            .json({ message: 'Google authentication failed' })
      }

      const payload = {
         userId: user._id,
         username: user.username,
         name: user.name,
         email: user.email,
      }

      const token = await generateJWT(payload)

      res.cookie('MOONWALKER-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.redirect('/')
   })(req, res)
}
