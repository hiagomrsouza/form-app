import { z } from 'zod';

const FormFieldSubmissionSchema = z.object({
  fieldId: z.string(),
  question: z.string(),
  answer: z.string()
});

const FormSubmissionSchema = z.object({
  fields: z.array(FormFieldSubmissionSchema)
});

export type FormFieldSubmission = z.infer<typeof FormFieldSubmissionSchema>;
export type FormSubmission = z.infer<typeof FormSubmissionSchema>;

export async function useSubmitForm(
  formId: string, 
  submissionData: FormSubmission
): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/';
  
  try {
    const response = await fetch(`${apiUrl}form/submit/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    
    throw error;
  }
}