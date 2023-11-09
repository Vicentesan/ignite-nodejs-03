import { FastifyInstance } from 'fastify'
import { Register } from './controllers/register'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/users', Register)
}
