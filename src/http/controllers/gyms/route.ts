import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { Search } from './search'
import { Nearby } from './nearby'
import { Create } from './create'

export async function GymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', Search)
  app.get('/gyms/nearby', Nearby)

  app.post('/gyms', Create)
}
