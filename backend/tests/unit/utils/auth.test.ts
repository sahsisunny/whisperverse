import { generateHash, compareHash, generateJWT, verifyJWT, generateResetToken } from '../../../src/utils/auth'

describe('auth/utils', () => {
   const payload = {
      userId: '123456789', 
      username: 'sunnysahsi',
      name: 'Sunny Sahsi',
      email: 'sunnysahsi@gmail.com'
   }

   it('should return hash for password', async () => {
      const result = generateHash('password')
      expect(result).toBeTruthy()
   })

   it('should return true if password is correct', async () => {
      const expectedHash = await generateHash('password')
      const result = await compareHash('password', expectedHash)
      expect(result).toEqual(true)
   })

   it('should return false if password is incorrect', async () => {
      const expectedHash = await generateHash('password')
      const result = await compareHash('password1', expectedHash)
      expect(result).toEqual(false)
   })

   it('should return reset token', async () => {
      const result = await generateResetToken()
      expect(result).toBeTruthy()
   })
})
