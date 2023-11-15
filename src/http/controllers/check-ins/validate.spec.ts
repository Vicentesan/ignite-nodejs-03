import { app } from '@/app'
import { db } from '@/lib/prisma'
import { CreateAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-in (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await CreateAndAuthUser(app)

    const user = await db.user.findFirstOrThrow()

    const createdGym = await db.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -23.6262141,
        longitude: -46.6960077,
      },
    })

    let checkIn = await db.checkIn.create({
      data: {
        gymId: createdGym.id,
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await db.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
