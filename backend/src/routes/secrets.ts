import express from 'express'
import { authinticate } from '../middlewares/authinticate'

import {
   createSecretController,
   deleteSecretController,
   getAllSecretsController,
   getSecretByUserIdController,
   updateSecretController,
} from '../controller/secrets'
import {
   createSecretValidator,
   updateSecretValidator,
} from '../middlewares/secrets'

export default (router: express.Router) => {
   router.get('/secrets', authinticate, getAllSecretsController)
   router.post(
      '/secrets',
      authinticate,
      createSecretValidator,
      createSecretController,
   )
   router.put('/secrets/:id', updateSecretValidator, updateSecretController)
   router.delete('/secrets/:id', deleteSecretController)
   router.get('/secrets/:id', getSecretByUserIdController)
}
