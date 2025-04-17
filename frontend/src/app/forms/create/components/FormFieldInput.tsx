'use client'

import styled, { css } from 'styled-components';
import { Colors } from '@/app/utils/Colors';
import { FieldType, FormField } from '../types';
import { ChangeEvent } from 'react';

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

type FormFieldInputProps = {
  formField: FormField;
  value: string;
  onChange: (fieldId: string, value: string) => void;
}

export function FormFieldInput({ formField, value, onChange }: FormFieldInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(formField.id, e.target.value);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    // For checkboxes, we need to handle multiple selections
    const currentValues = value ? value.split(',') : [];
    
    if (checked) {
      // Add the option if it's not already selected
      if (!currentValues.includes(option)) {
        const newValues = [...currentValues, option];
        onChange(formField.id, newValues.join(','));
      }
    } else {
      // Remove the option if it's selected
      const newValues = currentValues.filter(val => val !== option);
      onChange(formField.id, newValues.join(','));
    }
  };

  if (formField.type === FieldType.TEXT) {
    return (
      <TextInput 
        type="text" 
        id={formField.id} 
        value={value} 
        onChange={handleChange}
        required={formField.required}
      />
    );
  }

  if (formField.type === FieldType.NUMBER) {
    return (
      <TextInput 
        type="number" 
        id={formField.id} 
        value={value} 
        onChange={handleChange}
        required={formField.required}
      />
    );
  }

  if (formField.type === FieldType.DATE) {
    return (
      <TextInput 
        type="date" 
        id={formField.id} 
        value={value} 
        onChange={handleChange}
        required={formField.required}
      />
    );
  }

  if (formField.type === FieldType.TEXTAREA) {
    return (
      <TextArea 
        id={formField.id} 
        value={value} 
        onChange={handleChange}
        required={formField.required}
      />
    );
  }

  if (formField.type === FieldType.SELECT) {
    console.log('formField.options', formField.options);
    return (
      <Select 
        id={formField.id} 
        value={value} 
        onChange={handleChange}
        required={formField.required}
        style={{ background: Colors.background.default }}
      >
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
            <input 
              type="radio" 
              id={`${formField.id}-${index}`} 
              name={formField.id} 
              value={option}
              checked={value === option}
              onChange={handleChange}
              required={formField.required && index === 0} // Only set required on the first option
            />
            <label htmlFor={`${formField.id}-${index}`}>{option}</label>
          </RadioAndCheckboxOption>
        ))}
      </RadioAndCheckboxGroup>
    );
  }

  if (formField.type === FieldType.CHECKBOX) {
    const selectedValues = value ? value.split(',') : [];
    
    return (
      <RadioAndCheckboxGroup>
        {formField.options?.map((option: string, index: number) => (
          <RadioAndCheckboxOption key={index}>
            <input 
              type="checkbox" 
              id={`${formField.id}-${index}`} 
              name={formField.id} 
              value={option}
              checked={selectedValues.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              required={formField.required && index === 0 && selectedValues.length === 0} // Only set required on the first option if none selected
            />
            <label htmlFor={`${formField.id}-${index}`}>{option}</label>
          </RadioAndCheckboxOption>
        ))}
      </RadioAndCheckboxGroup>
    );
  }

  return null;  
}