import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { Create } from './create'
import { Validate } from './validate'
import { Metrics } from './metrics'
import { History } from './history'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function CheckInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', History)
  app.get('/check-ins/metrics', Metrics)

  app.post('/gyms/:gymId/check-ins', Create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    Validate,
  )
}
