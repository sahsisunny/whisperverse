import express from 'express'

import {
   getSelfController,
   googleAuthCallbackController,
   googleAuthController,
   loginController,
   logoutController,
   registerController,
} from '../controller/authentication'
import {
   registerUserValidator,
   validateLoginValidator,
} from '../middlewares/users'

export default (router: express.Router) => {
   router.post('/register', registerUserValidator, registerController)
   router.post('/login', validateLoginValidator, loginController)
   router.post('/logout', logoutController)
   router.get('/self', getSelfController)
   router.get('/auth/google', googleAuthController)
   router.get('/auth/google/callback', googleAuthCallbackController)
}
