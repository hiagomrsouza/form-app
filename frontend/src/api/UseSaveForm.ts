import { z } from 'zod';
import { FieldType, FormData as FormBuilderData, FormField } from '../app/forms/create/types/formTypes';

const ApiFormFieldSchema = z.object({
  type: z.nativeEnum(FieldType),
  question: z.string(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

const ApiFormDataSchema = z.object({
  name: z.string(),
  fields: z.record(ApiFormFieldSchema),
  submitButtonText: z.string().optional(),
});

const FormResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  fields: z.record(z.any()),
});

export type ApiFormField = z.infer<typeof ApiFormFieldSchema>;
export type ApiFormData = z.infer<typeof ApiFormDataSchema>;
export type FormResponse = z.infer<typeof FormResponseSchema>;

export function transformFormDataForApi(formData: FormBuilderData): ApiFormData {
  return {
    name: formData.name,
    fields: formData.fields.reduce((acc: Record<string, ApiFormField>, field: FormField) => {
      acc[field.id] = {
        type: field.type,
        question: field.label,
        required: field.required,
        options: field.options,
      };
      return acc;
    }, {}),
    submitButtonText: formData.submitButtonText,
  };
}

export async function useSaveForm(formData: FormBuilderData): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/';
  
  try {
    const apiFormData = transformFormDataForApi(formData);
    
    const response = await fetch(`${apiUrl}form/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiFormData),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    
    throw error;
  }
}
