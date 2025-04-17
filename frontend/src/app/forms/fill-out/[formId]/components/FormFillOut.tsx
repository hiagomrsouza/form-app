'use client'

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormData as FormPreviewData, FormField as FormPreviewField, FieldType, FeatureType } from "@/app/forms/create/types";
import { FormData, getFormById } from "@/api/GetFormById";
import { FormPreview } from "@/app/forms/create/components/FormPreview";
import styled from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { Breadcrumbs, Button, ButtonContainer, SpinnerLoading } from "@/app/components";
import { buildFormPreviewData } from "@/app/forms/[formId]/components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export default function FormFillOut() {
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

  return (
    <Container>
      <Breadcrumbs text='Form > Fill out' />

      <ButtonContainer>
        <Button 
          label="← Back to Forms"
          onClick={handleClickBack}
        />
      </ButtonContainer>
      
      <SpinnerLoading isLoading={isLoading} />
      
      {!isLoading && !error && formData && (
        <FormPreview
          formData={formData}
          feature={FeatureType.FILL_OUT}
          formId={params?.formId as string}
        />
      )}
    </Container>
  );
}