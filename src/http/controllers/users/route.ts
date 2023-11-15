import { FastifyInstance } from 'fastify'

import { Register } from './register'
import { Auth } from './auth'
import { Profile } from './profile'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { Refresh } from './refresh'

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Auth)
  app.patch('/token/refresh', Refresh)

  /* Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    Profile,
  )
}
