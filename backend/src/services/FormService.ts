import { PrismaClient } from '@prisma/client'
import { ApiError, StatusCodes } from '../errors'

interface FormSubmissionField {
  fieldId: string
  question: string
  answer: string
}

interface FormSubmissionData {
  fields: FormSubmissionField[]
}

export class FormService {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async submitFormData(formId: string, submissionData: FormSubmissionData) {

    try {
      await this.prisma.form.findUniqueOrThrow({ where: { id: formId } })
    } catch (err: any) {
      throw new ApiError('Form not found', StatusCodes.notFound)
    }

    if (!submissionData.fields || submissionData.fields.length === 0) {
      throw new ApiError('Submission must include at least one field', StatusCodes.badRequest)
    }

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const sourceRecord = await tx.sourceRecord.create({
          data: {
            formId,
          },
        })

        const sourceDataPromises = submissionData.fields.map((field) => {
          return tx.sourceData.create({
            data: {
              question: field.question,
              answer: field.answer,
              sourceRecordId: sourceRecord.id,
            },
          })
        })

        await Promise.all(sourceDataPromises)

        return sourceRecord
      })

      return result
    } catch (err: any) {      
      throw new ApiError('Failed to submit form data', StatusCodes.unexpected)
    }
  }
}