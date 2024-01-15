import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import http from 'http'
import mongoose from 'mongoose'

import router from './routes'
import passport from './services/passport'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

const app = express()

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use(
   session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      },
   }),
)

app.use(passport.initialize())
app.use(passport.session())

const server = http.createServer(app)

server.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`)
})

mongoose.Promise = Promise
mongoose.connect(MONGO_URI)

mongoose.connection.on('connected', () => {
   console.log('Connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
   console.error('Error connecting to mongo', err)
})

app.use('/', router())
