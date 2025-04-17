'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormData as FormPreviewData, FormField as FormPreviewField, FieldType, FeatureType } from "@/app/forms/create/types";
import { FormData, getFormById } from "@/api/GetFormById";
import { FormPreview } from "@/app/forms/create/components/FormPreview";
import styled from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { Breadcrumbs, Button, ButtonContainer, SpinnerLoading } from "@/app/components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const ErrorContainer = styled.div`
  padding: 16px;
  background-color: ${Colors.background.danger};
  color: ${Colors.text.critical};
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const buildFormPreviewData = (apiFormData: FormData): FormPreviewData => {

  const formattedFields: FormPreviewField[] = Object.entries(apiFormData.fields).map(([id, field]) => ({
    id,
    type: field.type as FieldType,
    label: field.question,
    required: field.required,
    options: field.options || [],
  }));

  return {
    name: apiFormData.name,
    fields: formattedFields,
    submitButtonText: 'Submit' // Default submit button text
  };
};

export default function FormView() {
  const router = useRouter();
  const params = useParams();
  
  const [formData, setFormData] = useState<FormPreviewData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSavedForm = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const formId = params?.formId as string;
      if (!formId) {
        setError('Form not found');
      }
      const apiFormData = await getFormById(formId);
      const convertedData = buildFormPreviewData(apiFormData);
      
      setFormData(convertedData);
    } catch (err) {
      console.error('Error fetching form:', err);
      setError('Failed to load form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSavedForm();
  }, [params]);

  const handleClickBack = (): void => {
    router.push('/');
  };

  const handleClickFillOut = (): void => {
    router.push('/forms/fill-out/' + params.formId);
  };

  return (
    <Container>
      <Breadcrumbs text='Form > View' />

      <ButtonContainer>
        <Button 
          label="← Back to Forms"
          onClick={handleClickBack}
        />
        <Button 
          primary 
          onClick={handleClickFillOut}
          label="Fill out the form"
        />
      </ButtonContainer>
      
      {error && (
        <ErrorContainer>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </ErrorContainer>
      )}
      
      <SpinnerLoading isLoading={isLoading} />
      
      {!isLoading && !error && formData && (
        <FormPreview
          formData={formData}
          feature={FeatureType.VIEW}
          formId={params?.formId as string}
        />
      )}
    </Container>
  );
}