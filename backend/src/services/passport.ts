import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import {
   createUserModel,
   getUserByGoogleIdModel,
   UserModel,
} from '../models/user'
import { IUser } from '../types/user'

dotenv.config()

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = process.env.GOOGLE_CALLBACK_URL

if (!clientID || !clientSecret || !callbackURL) {
   throw new Error(
      'Google OAuth credentials are missing. Please check your environment variables.',
   )
}

passport.use(
   new GoogleStrategy(
      {
         clientID,
         clientSecret,
         callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
         try {
            let user = await getUserByGoogleIdModel(profile.id)
            if (user && profile.emails === user.email) {
               user = await UserModel.findOneAndUpdate({ googleId: profile.id })
               return done(null, user)
            }

            if (!user) {
               user = await createUserModel({
                  name: profile.displayName,
                  email: profile.emails ? profile.emails[0].value : '',
                  googleId: profile.id,
               })
            }

            return done(null, user)
         } catch (err) {
            return done(err, null)
         }
      },
   ),
)

passport.serializeUser((user: IUser, done) => {
   done(null, user._id)
})

passport.deserializeUser(async (id: string, done) => {
   try {
      const user = await UserModel.findById(id)
      done(null, user)
   } catch (err) {
      done(err, null)
   }
})

export default passport
