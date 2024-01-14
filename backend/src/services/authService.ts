import bcrypt from 'bcrypt'

export const generateHash = async function (password: string) {
   try {
      return await bcrypt.hash(password, 10)
   } catch (error) {
      throw new Error(error)
   }
}

export const compareHash = async function (password: string, hash: string) {
   try {
      return await bcrypt.compare(password, hash)
   } catch (error) {
      throw new Error(error)
   }
}
