import { Static, Type } from '@sinclair/typebox'

import { Uuid } from './typebox_base'

export const EntityId = Type.Object({
  id: Uuid(),
})

export type IEntityId = Static<typeof EntityId>

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

export const CreateFormParams = Type.Object({
  name: Type.String(),
  fields: Type.Array(
    Type.Object({
      id: Type.String(),
      type: Type.Enum(FieldType),
      label: Type.String(),
      required: Type.Boolean(),
      options: Type.Array(Type.String()),
    })
  ),
})

export type ICreateFormParams = Static<typeof CreateFormParams>
