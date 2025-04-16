'use client'

import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { FieldType, FormData, FormField } from '../types';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${Colors.text.default};
  font-size: 16px;
  font-weight: 600;
`;

const FormNameInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${Colors.border.default};
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: ${Colors.border.highlight};
  }
`;

const FieldTypeRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${Colors.border.default};
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
  &:focus {
    outline: none;
    border-color: ${Colors.border.highlight};
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: ${Colors.button.default};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.button.hover};;
  }
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  background-color: ${Colors.background.subdued};
  border-radius: 4px;
  padding: 8px;
`;

const EmptyState = styled.div`
  padding: 16px;
  background-color: ${Colors.background.subdued};
  border-radius: 4px;
  text-align: center;
  color: ${Colors.text.light};
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 20px 10px;
  gap: 8px;
  padding-bottom: 4px;
  align-items: center;
`;

const FieldTypeDisplay = styled.div`
  font-size: 14px;
  color: ${Colors.text.default};
`;

const FieldContainer = styled.div`
  display: flex;
  gap: 4px;
  box-sizing: border-box;
  width: 100%;
`

const InputField = styled.input`
  padding: 6px 8px;
  border: 1px solid ${Colors.border.default};
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: ${Colors.border.highlight};
  }
`;

const Checkbox = styled.input`
  &:checked + span {
    background-color: ${Colors.border.highlight};
  }
  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.text.critical};
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButtonSection = styled.div`
  margin-top: 16px;
`;

const SubmitButtonInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${Colors.border.default};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${Colors.border.highlight};
  }
`;

type FormBuilderProps = {
  formData: FormData;
  onFormDataChange: (formData: FormData) => void;
}

export function FormBuilder({ formData, onFormDataChange }: FormBuilderProps) {
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType>(FieldType.TEXT);

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({
      ...formData,
      name: e.target.value
    });
  };

  const handleSubmitButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({
      ...formData,
      submitButtonText: e.target.value
    });
  };

  const handleAddField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: selectedFieldType,
      label: '',
      required: false,
      options: ['']
    };

    onFormDataChange({
      ...formData,
      fields: [...formData.fields, newField]
    });
  };

  const handleFieldLabelChange = (id: string, value: string) => {
    onFormDataChange({
      ...formData,
      fields: formData.fields.map(field => 
        field.id === id ? { ...field, label: value } : field
      )
    });
  };

  const handleFieldRequiredChange = (id: string, required: boolean) => {
    console.log('handleFieldRequiredChange', id, required);
    onFormDataChange({
      ...formData,
      fields: formData.fields.map(field => 
        field.id === id ? { ...field, required } : field
      )
    });
  };

  const handleFieldOptionsChange = (id: string, optionsString: string) => {
    const options = optionsString.split(',').map(option => option.trim());
    
    onFormDataChange({
      ...formData,
      fields: formData.fields.map(field => 
        field.id === id ? { ...field, options } : field
      )
    });
  };

  const handleDeleteField = (id: string) => {
    onFormDataChange({
      ...formData,
      fields: formData.fields.filter(field => field.id !== id)
    });
  };

  const needsOptions = (type: FieldType) => {
    return type === FieldType.SELECT || type === FieldType.RADIO || type === FieldType.CHECKBOX;
  };

  return (
    <BuilderContainer>
      <Section>
        <SectionTitle>Form name</SectionTitle>
        <FormNameInput 
          type="text" 
          value={formData.name} 
          onChange={handleFormNameChange}
          placeholder="Enter form name"
        />
      </Section>

      <Section>
        <SectionTitle>Add Field</SectionTitle>
        <FieldTypeRow>
          <Select
            style={{ background: Colors.background.default }}
            value={selectedFieldType}
            onChange={(e) => setSelectedFieldType(e.target.value as FieldType)}
          >
            <option value={FieldType.TEXT}>Text</option>
            <option value={FieldType.NUMBER}>Number</option>
            <option value={FieldType.DATE}>Date</option>
            <option value={FieldType.TEXTAREA}>Text area</option>
            <option value={FieldType.SELECT}>Select</option>
            <option value={FieldType.RADIO}>Radio</option>
            <option value={FieldType.CHECKBOX}>Checkbox</option>
          </Select>
          <Button onClick={handleAddField}>Add field</Button>
        </FieldTypeRow>
      </Section>

      <Section>
        <SectionTitle>Form fields</SectionTitle>
        {formData.fields.length === 0 ? (
          <EmptyState>No fields added yet</EmptyState>
        ) : (
          <FieldsContainer>
            {formData.fields.map((field) => (
              <FieldRow key={field.id}>
                <FieldTypeDisplay title="Type">{field.type}</FieldTypeDisplay>
                <FieldContainer>
                  <InputField 
                    type="text" 
                    style={{ width: needsOptions(field.type) ? '170px' : '100%' }}
                    value={field.label} 
                    onChange={(e) => handleFieldLabelChange(field.id, e.target.value)}
                    placeholder="Field label"
                    title="Field label"
                  />
                  {needsOptions(field.type) && (
                    <InputField
                      type="text"
                      style={{ width: 'fit-content' }}
                      value={field.options?.join(', ') || ''}
                      onChange={(e) => handleFieldOptionsChange(field.id, e.target.value)}
                      placeholder="Options (comma separated)"
                      title="Options (comma separated)"
                    />
                  )}
                </FieldContainer>
                <Checkbox 
                  type="checkbox" 
                  checked={field.required}
                  onChange={(e) => handleFieldRequiredChange(field.id, e.target.checked)}
                  title='Is required'
                />
                <DeleteButton 
                  onClick={() => handleDeleteField(field.id)}
                  title='Remove field'
                >×</DeleteButton>
              </FieldRow>
            ))}
          </FieldsContainer>
        )}
      </Section>

      <SubmitButtonSection>
        <SectionTitle>Default button text</SectionTitle>
        <SubmitButtonInput 
          type="text" 
          value={formData.submitButtonText} 
          onChange={handleSubmitButtonTextChange}
          placeholder="Submit"
        />
      </SubmitButtonSection>
    </BuilderContainer>
  );
}