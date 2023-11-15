import { app } from '@/app'
import { db } from '@/lib/prisma'
import { CreateAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in Metrics (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the count of check-ins', async () => {
    const { token } = await CreateAndAuthUser(app)

    const user = await db.user.findFirstOrThrow()

    const createdGym = await db.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -23.6262141,
        longitude: -46.6960077,
      },
    })

    await db.checkIn.createMany({
      data: [
        {
          gymId: createdGym.id,
          userId: user.id,
        },
        {
          gymId: createdGym.id,
          userId: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
