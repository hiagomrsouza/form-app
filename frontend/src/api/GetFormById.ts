import { z } from 'zod';

const FormFieldSchema = z.object({
  type: z.string(),
  question: z.string(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

const FormDataSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  fields: z.record(FormFieldSchema)
});

const FormResponseSchema = z.object({
  statusCode: z.number(),
  data: FormDataSchema,
  message: z.string()
});

export type FormField = z.infer<typeof FormFieldSchema>;
export type FormData = z.infer<typeof FormDataSchema>;
export type FormResponse = z.infer<typeof FormResponseSchema>;

export async function getFormById(formId: string): Promise<FormData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/';
  
  try {
    const response = await fetch(`${apiUrl}form/${formId}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const responseData = await response.json();
    
    const validatedData = FormResponseSchema.parse(responseData);
    
    return validatedData.data;
  } catch (error) {

    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    
    throw error;
  }
}