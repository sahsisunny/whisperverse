import express from 'express'
import { authinticate } from '../middlewares/authinticate'

import {
   createOrUpdateSecretController,
   deleteSecretController,
   getAllSecretsController,
   getSecretByUserIdController,
} from '../controller/secrets'
import { createSecretValidator } from '../middlewares/secrets'

export default (router: express.Router) => {
   router.get('/secrets', authinticate, getAllSecretsController)
   router.post(
      '/secrets',
      authinticate,
      createSecretValidator,
      createOrUpdateSecretController,
   )
   router.delete('/secrets/:id', deleteSecretController)
   router.get('/secrets/:id', getSecretByUserIdController)
}
