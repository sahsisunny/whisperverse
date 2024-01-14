/*
import mongoose from 'mongoose'

const SecretSchema = new mongoose.Schema({
   secret: {
      type: String,
      required: true,
   },
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
     },
})
export const SecretModel = mongoose.model('Secret', SecretSchema)

export const getAllSecretsController = async () => {
   return await SecretModel.find({})
}

export const getSecretById = async (id: string) => {
   return await SecretModel.findById(id)
}

export const createSecret = async (secret: string, userId: string) => {
    const newSecret = new SecretModel({ secret, userId })
    return await newSecret.save()
    }

export const deleteSecret = async (id: string) => {
    return await SecretModel.findByIdAndDelete(id)
    }

export const updateSecretController = async (id: string, secret: string) => {
    const newSecret = await SecretModel.findById(id)
    if (!newSecret) {
        throw new Error('Secret not found')
    }
    newSecret.secret = secret
    return await newSecret.save()
}
*/
