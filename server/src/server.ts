import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { resolve } from 'node:path'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(multipart)

app.register(cors, {
  origin: true,
})

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in the environment variables.')
  process.exit(1)
}

app.register(jwt, {
  secret: process.env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333')
  })