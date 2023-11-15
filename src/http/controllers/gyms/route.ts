import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { Search } from './search'
import { Nearby } from './nearby'
import { Create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function GymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', Search)
  app.get('/gyms/nearby', Nearby)

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
    },
    Create,
  )
}
