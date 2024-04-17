import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany({})

    return users.map((user) => {
      return {
        name: user.name,
        id: user.id,
        avatarUrl: user.avatarUrl
      }
    })
  })

  app.get('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      }
    })

    return user
  })

  app.post('/users', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      login: z.string(),
      avatarUrl: z.string(),
    })

    const { name, login, avatarUrl } = bodySchema.parse(request.body)

    const user = await prisma.user.create({
      data: {
        name,
        login,
        avatarUrl
      },
    })

    return user
  })

  app.put('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      login: z.string(),
      avatarUrl: z.string(),
    })

    const { name, login, avatarUrl } = bodySchema.parse(request.body)

    let user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        login,
        avatarUrl,
      },
    })

    return user
  })

  app.delete('/users/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    await prisma.user.delete({
      where: {
        id,
      }
    })
  })
}