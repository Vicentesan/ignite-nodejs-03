import { FastifyReply, FastifyRequest } from 'fastify'
export async function Profile(req: FastifyRequest, res: FastifyReply) {
  return res.status(200).send()
}
