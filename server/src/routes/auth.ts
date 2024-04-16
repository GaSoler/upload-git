import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
  app.post('/authenticate', async (request, reply) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    if (code !== process.env.AUTH_SECRET) {
      reply.status(401).send({ error: 'Código de autorização inválido' })
      return;
    }

    const token = app.jwt.sign({})

    reply.send({ token })
  })

  app.post('/login', async (request, reply) => {
    const bodySchema  = z.object({
      id: z.string(),
      name: z.string(),
      avatarUrl: z.string().url(),
    })

    const { id, name, avatarUrl } = bodySchema .parse(request.body)

    let user = await prisma.user.findUnique({
      where: {
        id: id.toString(),
      },
    })

    if (!user) {
      reply.status(404).send({ error: 'Usuário não encontrado' })
      return;
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl
      },
      {
        sub: user.id,
        expiresIn: '30 days'
      },
    )

    reply.send({ token })
  })
}