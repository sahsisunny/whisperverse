import express from 'express'
import { authinticate } from '../middlewares/authinticate'

import {
   createPasswordResetController,
   getPasswordResetByTokenController,
   deletePasswordResetController,
} from '../controller/passwordReset'

export default (router: express.Router) => {
   router.get(
      '/password-reset',
      authinticate,
      getPasswordResetByTokenController,
   )
   router.post('/password-reset', authinticate, createPasswordResetController)
   router.delete('/password-reset', authinticate, deletePasswordResetController)
}
