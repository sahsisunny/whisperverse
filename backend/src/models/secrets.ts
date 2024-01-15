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
   timestamp: {
      type: Date,
      default: Date.now,
   },
})
export const SecretModel = mongoose.model('Secret', SecretSchema)

export const getAllSecretsModel = async () => {
   return await SecretModel.find().sort({ timestamp: -1 })
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

export const updateSecretModel = async (userId: string, secret: string) => {
   const newSecret = await SecretModel.findOne({ userId })
   if (!newSecret) {
      throw new Error('Secret not found')
   }
   newSecret.secret = secret
   return await newSecret.save()
}
