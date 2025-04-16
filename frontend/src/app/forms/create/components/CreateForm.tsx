'use client'

import { useState } from 'react';
import { Colors } from "@/app/utils/Colors";
import styled from "styled-components";
import { FeatureType, FormData } from '../types';
import { useRouter } from 'next/navigation';
import { useSaveForm } from '@/api/UseSaveForm';
import { FormBuilder } from './FormBuilder';
import { FormPreview } from './FormPreview';
import { Breadcrumbs, Button, ButtonContainer } from '@/app/components';

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
`

const BuilderFormContainer = styled.div`
  grid-column: 1 / span 4;
`

const ViewFormSection = styled.div`
  grid-column: 5 / span 8;
  display: flex;
  justify-content: center;
`

const DefaultSection = styled.div`
  background: ${Colors.background.default};
  border-radius: 6px;
  padding: 16px;
  height: 90vh;
  overflow-y: auto;
`

const BuildForm = styled(DefaultSection)`
  width: 100%;
`

const ViewForm = styled(DefaultSection)`
  width: 100%;
`

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid ${Colors.border.default};
`

const SaveButton = styled.button`
  padding: 10px 16px;
  background-color: ${Colors.button.default};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.button.hover};
  }
  &:disabled {
    background-color:  ${Colors.button.disabled};
    cursor: not-allowed;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export function CreateForm() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    fields: [],
    submitButtonText: 'Submit'
  });

  const handleFormDataChange = (newFormData: FormData) => {
    setFormData(newFormData);
  };

  const handleSaveForm = async () => {
    if (!formData.name) {
      alert('Please enter a form name');
      return;
    }

    if (formData.fields.length === 0) {
      alert('Please add at least one field to your form');
      return;
    }

    setIsSaving(true);

    try {
      await useSaveForm(formData);
      alert('Form saved successfully!');
      router.push('/forms');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClickBack = (): void => {
    router.push('/');
  };

  return (
    <MainContainer>
      <Breadcrumbs text='Form > Create' />

      <BuilderFormContainer>
        <BuildForm>
          <FormBuilder
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
          <ActionBar>
            <SaveButton
              onClick={handleSaveForm}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save form'}
            </SaveButton>
          </ActionBar>
        </BuildForm>
      </BuilderFormContainer>

      <ViewFormSection>
        <ViewForm>
          <FormPreview formData={formData} feature={FeatureType.CREATE}/>
        </ViewForm>
      </ViewFormSection>
    </MainContainer>
  );
}
