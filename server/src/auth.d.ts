import '@fastify/jwt'

declare module '@fastify/jwt'{
  export interface FastifyJWT {
    user: {
      id: string
      name: string
      avatarUrl: string
    }
  }
}