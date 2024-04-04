import { FastifyInstance } from 'fastify'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import axios, { AxiosError } from 'axios'
import FormData from 'form-data'


export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    try {
      const upload = await request.file({
        limits: {
          fileSize: 5_242_880, // 5mb
        },
      })

      if (!request.isMultipart()) {
        reply.code(400).send(new Error('Request is not multipart'))
        return
      }

      if (!upload) {
        reply.status(400).send(new Error('Image not included'))
        return
      }

      const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
      const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

      if (!isValidFileFormat) {
        return reply.status(400).send(new Error('Invalid file type'))
      }

      const uploadBuffer = await upload.toBuffer()

      const formData = new FormData()

      formData.append('image', uploadBuffer.toString('base64'))
      formData.append('key', process.env.IMGBB_API_KEY)

      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
        {
          headers: { 'content-type': 'multipart/form-data' },
        },
      )

      return {
        fileUrl: response.data.data.url,
      }

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error({
        code: error.code,
        message: error.message,
        responseData: error?.response?.data,
      })
      reply
        .code(500)
        .send(new Error('Error on uploading the file to the hosting service'))
      return
    }

    const fastifyMultipartError = error as any
      if (fastifyMultipartError?.code === 'FST_REQ_FILE_TOO_LARGE') {
        reply.code(Number(fastifyMultipartError.statusCode)).send()
      }

      console.error(error)
      reply.code(500)
    }
  })
}