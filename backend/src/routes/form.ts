import { FastifyInstance } from 'fastify'

import { Form, SourceRecord } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ICreateFormParams, IEntityId } from './schemas/common'
import { ApiError } from '../errors'
import { FormService } from '../services'
import { IFormSubmissionParams } from './formTypes'

async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formRoutes' })

  app.get<{
    Params: IEntityId
    Reply: Form
  }>('/:id', {
    async handler(req, reply) {
      const { params } = req
      const { id } = params
      log.debug('get form by id')
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } })
        reply.send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form', 400)
      }
    },
  })

  app.post<{
    Body: ICreateFormParams
    Reply: Form
  }>('/create', {
    async handler(req, reply) {
      const { body } = req
      log.debug('create form --->', body)
      try {
        const form = await prisma.form.create({
          data: {
            name: body.name,
            fields: body.fields,
          },
        })
        reply.code(201).send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch forms', 400)
      }
    },
  })

  app.get<{
    Reply: Form[]
  }>('/all', {
    async handler(req, reply) {
      log.debug('get all forms')
      try {
        const forms = await prisma.form.findMany()
        reply.code(201).send(forms)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to create form', 400)
      }
    },
  })

  app.post<{
    Params: IEntityId
    Body: IFormSubmissionParams
    Reply: SourceRecord
  }>('/submit/:id', {
    async handler(req, reply) {
      const { params, body } = req
      const { id: formId } = params

      log.debug('submit form data --->', { formId, fields: body.fields })

      try {
        const formService = new FormService(prisma)
        
        const result = await formService.submitFormData(formId, body)
        
        reply.code(201).send(result)
      } catch (err: any) {
        log.error({ err }, err.message)
        
        throw err
      }
    },
  })
}

export default formRoutes
