'use client'

import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { FeatureType, FormData } from '../types';
import { Button, InfoAlert, SpinnerLoading, SuccessAndErrorAlert } from '@/app/components';
import { FormFieldAdded } from './FormFieldAdded';
import { FormFieldInput } from './FormFieldInput';
import { useSubmitForm, FormFieldSubmission } from '@/api/UseSubmitForm';

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const FormTitle = styled.h2`
  margin: 0;
  color: ${Colors.text.default};
  font-size: 20px;
  font-weight: 600;
`;

const FormCard = styled.div`
  background-color: ${Colors.background.default};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.label<{ required?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.text.default};
  
  ${props => props.required && `
    &::after {
      content: " *";
      color: ${Colors.text.critical};
    }
  `}
`;

const SubmitButton = styled.button<{ isLoading?: boolean }>`
  margin-top: 24px;
  padding: 10px 16px;
  background-color: ${props => props.isLoading ? Colors.button.disabled : Colors.button.default};
  color: ${Colors.background.default};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  &:hover {
    background-color: ${props => props.isLoading ? Colors.button.disabled : Colors.button.hover};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: ${Colors.text.light};
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid ${Colors.background.default};
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled.div<{success?: boolean}>`
  margin-top: 16px;
  padding: 12px 16px;
  background-color: ${({ success }) => (success ? Colors.background.success : Colors.background.danger)};
  color: ${({ success }) => (success ? Colors.text.success : Colors.text.critical)};
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ErrorMessage = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background-color: ${Colors.background.danger};
  color: ${Colors.text.critical};
  border-radius: 4px;
  font-size: 14px;
`;

type FormPreviewProps = {
  formData: FormData;
  feature: FeatureType;
  formId?: string; // Optional form ID for submission
}

export function FormPreview({ formData, feature, formId }: FormPreviewProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };
  
  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);
    
    const missingRequiredFields = formData.fields
      .filter(field => field.required && (!formValues[field.id] || formValues[field.id].trim() === ''))
      .map(field => field.label || 'Untitled field');
    
    if (missingRequiredFields.length > 0) {
      setSubmitError(`Please fill in the following required fields: ${missingRequiredFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }
    
    const submissionFields: FormFieldSubmission[] = formData.fields.map(field => ({
      fieldId: field.id,
      question: field.label,
      answer: formValues[field.id] || ''
    }));
    
    try {
      if (!formId) {
        throw new Error('Form ID is missing');
      }
      
      await useSubmitForm(formId, { fields: submissionFields });
      
      setSubmitSuccess(true);
      
      setFormValues({});
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PreviewContainer>
      <FormTitle>{formData.name || 'Untitled form'}</FormTitle>
      
      {feature === FeatureType.CREATE && (
        <InfoAlert message='This is a preview of your form content. The fields that you added will be displayed here.' />
      )}
      
      {(submitError || submitSuccess) && feature === FeatureType.FILL_OUT && (
        <SuccessAndErrorAlert 
          success={submitSuccess} 
          message={submitSuccess ? 'Form submitted successfully!' : submitError || ''} 
        />
      )}
      
      <FormCard>
        {formData.fields.length === 0 ? (
          <EmptyState>Add fields to see a preview of your form</EmptyState>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormFields>
              {formData.fields.map((field) => (
                <FieldContainer key={field.id}>
                  <FieldLabel htmlFor={field.id} required={field.required}>
                    {field.label || 'Untitled field'}
                  </FieldLabel>
                  
                  {/* Use different field components based on the feature */}
                  {feature === FeatureType.FILL_OUT ? (
                    <FormFieldInput
                      formField={field}
                      value={formValues[field.id] || ''}
                      onChange={handleFieldChange}
                    />
                  ) : (
                    <FormFieldAdded
                      formField={field}
                    />
                  )}
                </FieldContainer>
              ))}
              
              {feature === FeatureType.FILL_OUT && (
                <Button 
                  primary
                  disabled={isSubmitting}
                  label={isSubmitting ? 'Submitting...' : 'Submit'}
                  onClick={handleSubmit}
                />
              )}
            </FormFields>
          </form>
        )}
      </FormCard>
    </PreviewContainer>
  );
}