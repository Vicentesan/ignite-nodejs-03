import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeAuthUseCase } from '@/use-cases/factories/make-auth-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function Auth(req: FastifyRequest, res: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authBodySchema.parse(req.body)

  try {
    const authUseCase = makeAuthUseCase()

    const { user } = await authUseCase.execute({ email, password })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return res.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}
