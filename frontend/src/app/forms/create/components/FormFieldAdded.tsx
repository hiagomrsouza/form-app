'use client'

import styled, { css } from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { FieldType, FormField } from '../types';

const DefaultInput = css`
  padding: 8px 12px;
  border: 1px solid ${Colors.border.default};
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: ${Colors.border.highlight};
  }
`;

const TextInput = styled.input`
  ${DefaultInput}
`;

const TextArea = styled.textarea`
  ${DefaultInput}
`;

const Select = styled.select`
  ${DefaultInput}
`;

const RadioAndCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const RadioAndCheckboxOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

type FormFieldProps = {
  formField: FormField;
}

export function FormFieldAdded({ formField }: FormFieldProps) {

  if (formField.type === FieldType.TEXT) {
    return <TextInput type="text" id={formField.id} />;
  }

  if (formField.type === FieldType.NUMBER) {
    return <TextInput type="number" id={formField.id} />;
  }

  if (formField.type === FieldType.DATE) {
    return <TextInput type="date" id={formField.id} />;
  }

  if (formField.type === FieldType.TEXTAREA) {
    return <TextArea id={formField.id} />;
  }

  if (formField.type === FieldType.SELECT) {
    return (
      <Select id={formField.id} style={{ background: Colors.background.default }}>
        <option value="">Select an option</option>
        {formField.options?.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  if (formField.type === FieldType.RADIO) {
    return (
      <RadioAndCheckboxGroup>
        {formField.options?.map((option: string, index: number) => (
          <RadioAndCheckboxOption key={index}>
            <input type="radio" id={`${formField.id}-${index}`} name={formField.id} value={option} />
            <label htmlFor={`${formField.id}-${index}`}>{option}</label>
          </RadioAndCheckboxOption>
        ))}
      </RadioAndCheckboxGroup>
    );
  }

  if (formField.type === FieldType.CHECKBOX) {
    return (
      <RadioAndCheckboxGroup>
        {formField.options?.map((option: string, index: number) => (
          <RadioAndCheckboxOption key={index}>
            <input type="checkbox" id={`${formField.id}-${index}`} name={formField.id} value={option} />
            <label htmlFor={`${formField.id}-${index}`}>{option}</label>
          </RadioAndCheckboxOption>
        ))}
      </RadioAndCheckboxGroup>
    );
  }

  return null;  
}