import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'
import { Auth } from './controllers/auth'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/users', Register)

  app.post('/sessions', Auth)
}
