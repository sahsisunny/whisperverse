import express from 'express'
import { authinticate } from '../middlewares/authinticate'

import {
   createPasswordResetController,
   getPasswordResetByTokenController,
   deletePasswordResetController,
   passwordResetController,
} from '../controller/passwordReset'
import { passwordResetValidator } from '../middlewares/passwordReset'

export default (router: express.Router) => {
   router.get(
      '/password-reset',
      authinticate,
      getPasswordResetByTokenController,
   )
   router.post('/password-reset', authinticate, createPasswordResetController)
   router.delete('/password-reset', authinticate, deletePasswordResetController)
   router.put(
      '/password-reset/reset',
      passwordResetValidator,
      passwordResetController,
   )
}
