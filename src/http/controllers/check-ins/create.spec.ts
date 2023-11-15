import { app } from '@/app'
import { db } from '@/lib/prisma'
import { CreateAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await CreateAndAuthUser(app, true)

    const createdGym = await db.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -23.6262141,
        longitude: -46.6960077,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${createdGym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.6262141,
        longitude: -46.6960077,
      })

    expect(response.statusCode).toEqual(201)
  })
})
