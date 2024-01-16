import express from 'express'

import {
   createOrUpdateSecretController,
   deleteSecretController,
   getAllSecretsController,
   getSecretByUserIdController,
} from '../controller/secrets'
import { authinticate } from '../middlewares/authinticate'
import { createSecretValidator } from '../middlewares/secrets'

export default (router: express.Router) => {
   router.get('/secrets', getAllSecretsController)
   router.post(
      '/secrets',
      authinticate,
      createSecretValidator,
      createOrUpdateSecretController,
   )
   router.delete('/secrets/:id', deleteSecretController)
   router.get('/secrets/:id', getSecretByUserIdController)
}
