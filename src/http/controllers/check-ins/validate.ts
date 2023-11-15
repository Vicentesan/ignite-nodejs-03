import { makeValidateCheckInUseCaseUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function Validate(req: FastifyRequest, res: FastifyReply) {
  const ValidateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = ValidateCheckInsParamsSchema.parse(req.params)

  const validateCheckInUseCase = makeValidateCheckInUseCaseUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return res.status(204).send()
}
