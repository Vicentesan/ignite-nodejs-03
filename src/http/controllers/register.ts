import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository '
import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists'
export async function Register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }

  return res.status(201).send()
}
