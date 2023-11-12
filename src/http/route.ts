import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'
import { Auth } from './controllers/auth'
import { Profile } from './controllers/profile'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/users', Register)
  app.post('/sessions', Auth)

  /* Authenticated */
  app.get('/me', Profile)
}
