import { z } from 'zod';

const FormFieldSchema = z.object({
  type: z.string(),
  question: z.string(),
  required: z.boolean()
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

/**
 * Fetches a form by its ID from the API
 * @param formId - The UUID of the form to fetch
 * @returns The validated form data
 */
export async function useFormById(formId: string): Promise<FormData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/';
  
  try {
    // Make the API request
    const response = await fetch(`${apiUrl}form/${formId}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    // Parse the response as JSON
    const responseData = await response.json();
    
    // Validate the response data using the Zod schema
    const validatedData = FormResponseSchema.parse(responseData);
    
    // Return the validated form data
    return validatedData.data;
  } catch (error) {
    // If the error is from Zod validation, it will be a ZodError
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    
    // Re-throw the error for the caller to handle
    throw error;
  }
}