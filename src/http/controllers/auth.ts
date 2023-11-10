import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository '
import { AuthUseCase } from '@/use-cases/auth'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function Auth(req: FastifyRequest, res: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authUseCase = new AuthUseCase(usersRepository)

    await authUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }

  return res.status(200).send()
}
