import { FastifyInstance } from 'fastify'

import { Register } from './register'
import { Auth } from './auth'
import { Profile } from './profile'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Auth)

  /* Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    Profile,
  )
}
