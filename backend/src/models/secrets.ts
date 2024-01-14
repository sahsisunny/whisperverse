import mongoose from 'mongoose'

const SecretSchema = new mongoose.Schema({
   secret: {
      type: String,
      required: true,
      unique: true,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
})
export const SecretModel = mongoose.model('Secret', SecretSchema)

export const getAllSecretsModel = async () => {
   return await SecretModel.find({})
}

export const getSecretByUserIdModel = async (userId: string) => {
   return await SecretModel.findOne({ userId })
}

export const createSecretModel = async (secret: string, userId: string) => {
   const newSecret = new SecretModel({ secret, userId })
   return await newSecret.save()
}

export const deleteSecretModel = async (id: string) => {
   return await SecretModel.findByIdAndDelete(id)
}

export const updateSecretModel = async (id: string, secret: string) => {
   const newSecret = await SecretModel.findById(id)
   if (!newSecret) {
      throw new Error('Secret not found')
   }
   newSecret.secret = secret
   return await newSecret.save()
}
