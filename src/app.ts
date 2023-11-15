import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { GymsRoutes } from './http/controllers/gyms/route'
import { UsersRoutes } from './http/controllers/users/route'
import { CheckInsRoutes } from './http/controllers/check-ins/route'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(UsersRoutes)
app.register(GymsRoutes)
app.register(CheckInsRoutes)

app.setErrorHandler((err, _req, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error', issues: err.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: 'Internal server error' })
})
