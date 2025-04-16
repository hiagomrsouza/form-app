'use client'

import styled from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { FormData } from '../types';
import { InfoAlert } from '@/app/components';
import { FormFieldAdded } from './FormFieldAdded';

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

const SubmitButton = styled.button`
  margin-top: 24px;
  padding: 10px 16px;
  background-color: ${Colors.button.default};
  color: ${Colors.background.default};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.button.hover};
  }
`;

const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: ${Colors.text.light};
`;

type FormPreviewProps = {
  formData: FormData;
}

export function FormPreview({ formData }: FormPreviewProps) {
  return (
    <PreviewContainer>
      <FormTitle>{formData.name || 'Untitled form'}</FormTitle>
      
      <InfoAlert message='This is a preview of your form content. The fields that you added will be displayed here.' />
      
      <FormCard>
        {formData.fields.length === 0 ? (
          <EmptyState>Add fields to see a preview of your form</EmptyState>
        ) : (
          <FormFields>
            {formData.fields.map((field) => (
              <FieldContainer key={field.id}>
                <FieldLabel htmlFor={field.id} required={field.required}>
                  {field.label || 'Untitled field'}
                </FieldLabel>
                <FormFieldAdded
                  formField={field}
                />
              </FieldContainer>
            ))}
            
            <SubmitButton>
              {formData.submitButtonText || 'Submit'}
            </SubmitButton>
          </FormFields>
        )}
      </FormCard>
    </PreviewContainer>
  );
}