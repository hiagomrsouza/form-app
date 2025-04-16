import { z } from 'zod';

const FormFieldSchema = z.object({
  type: z.string(),
  question: z.string(),
  required: z.boolean()
});

const FormSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  fields: z.record(FormFieldSchema)
});

const FormsResponseSchema = z.array(FormSchema);

export type FormField = z.infer<typeof FormFieldSchema>;
export type Form = z.infer<typeof FormSchema>;

export async function useAllForms(): Promise<Form[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/';
  
  try {
    const response = await fetch(`${apiUrl}form/all`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    
    const validatedData = FormsResponseSchema.parse(responseData.data);
    
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    
    throw error;
  }
}

/**
 * Calculates the number of fields in a form
 * @param form The form object
 * @returns The number of fields in the form
 */
export function getFieldCount(form: Form): number {
  // Count the number of keys in the fields object
  return Object.keys(form.fields).length;
}
