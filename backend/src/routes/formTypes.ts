import { Static, Type } from '@sinclair/typebox'

const FormSubmissionField = Type.Object({
  fieldId: Type.String(),
  question: Type.String(),
  answer: Type.String(),
})

const FormSubmissionParams = Type.Object({
  fields: Type.Array(FormSubmissionField),
})

export type IFormSubmissionParams = Static<typeof FormSubmissionParams>
