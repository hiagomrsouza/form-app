export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[]; // For select, radio, checkbox fields
}

export type FormData = {
  name: string;
  fields: FormField[];
  submitButtonText: string;
}

export enum FeatureType {
  CREATE = 'create',
  VIEW = 'view',
  EDIT = 'edit',
  FILL_OUT = 'fill_in',
}
