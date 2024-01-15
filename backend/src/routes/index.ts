import express, { Request, Response } from 'express'

import authentication from './authentication'
import passwordReset from './passwordReset'
import user from './secrets'

const router = express.Router()
/**
 * @route GET /
 * @description Welcome message and API information
 * @access Public
 */
router.get('/', (req: Request, res: Response) => {
   res.status(200).json({
      message: 'Welcome to the Whisperverse API!',
      version: '1.0.0',
      description:
         'Whisperverse is a dynamic web application that allows users to share and explore anonymous secrets. The application is built with a Full Stack approach, utilizing technologies such as React.js, Express, Node.js, MongoDB, and various other tools to provide a seamless and secure experience.',
      author: 'Sunny Sahsi',
      repository: 'https://github.com/sahsisunny/whisperverser',
      documentation:
         'https://github.com/sahsisunny/whisperverse/blob/main/README.md',
      endpoints: [
         { path: '/', methods: ['GET'], middlewares: ['anonymous'] },
         {
            path: '/register',
            methods: ['POST'],
            description: 'Register a new user',
         },
         {
            path: '/login',
            methods: ['POST'],
            description:
               'Login an existing user with email or username and password',
         },
         {
            path: '/logout',
            methods: ['POST'],
            description: 'Logout an existing user',
         },
         {
            path: '/self',
            methods: ['GET'],
            description: 'Get the current user',
         },
         {
            path: '/auth/google',
            methods: ['GET'],
            description: 'Authenticate with Google',
         },
         {
            path: '/auth/google/callback',
            methods: ['GET'],
            description: 'Google authentication callback',
         },
         {
            path: '/secrets',
            methods: ['GET', 'POST'],
            description: 'Get all secrets or create a new secret',
         },
         {
            path: '/secrets/:id',
            methods: ['DELETE', 'GET'],
            description: 'Delete a secret or get a secret by id',
         },
         {
            path: '/password-reset',
            methods: ['GET', 'POST', 'DELETE'],
            description:
               'Get password reset token, create a new password reset token, or delete password resets token',
         },
         {
            path: '/password-reset/reset',
            methods: ['PUT'],
            description: 'Reset password with password reset token',
         },
      ],
   })
})

export default (): express.Router => {
   authentication(router)
   user(router)
   passwordReset(router)
   return router
}
