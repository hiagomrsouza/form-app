'use client'

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, getFieldCount, useAllForms } from "../../../api/UseAllForms";
import Link from "next/link";
import { Colors } from "@/app/utils/Colors";
import { useRouter } from "next/navigation";

const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  background: ${Colors.background.subdued};
`;

const TableHead = styled.thead`
  background-color:  ${Colors.background.default};
`;

const TableRow = styled.tr`
  cursor: pointer;

  &:nth-child(even) {
    background-color: ${Colors.background.default};
  }
  
  &:hover {
    background-color: ${Colors.background.pressed};
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid ${Colors.border.default};
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid ${Colors.border.default};
`;

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const CreateButton = styled.a`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: ${Colors.button.default};;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  
  &:hover {
    background-color: ${Colors.button.hover};
  }
`;

export default function FormList() {
  const router = useRouter();

  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const formsData = await useAllForms();
      setForms(formsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError('Failed to load forms. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleClickCreateForm = () => {
    router.push('/forms/create');
  }

  const handleClickFormRow = (formId: string) => {
    router.push(`/forms/${formId}`);
  }

  if (isLoading) {
    return (
      <MainContainer>
        <Title>Forms</Title>
        <LoadingMessage>Loading forms...</LoadingMessage>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <CreateButton onClick={handleClickCreateForm}>Create New Form</CreateButton>
      
      {forms.length > 0 ? (
        <Table>
          <TableHead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Number of Fields</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {forms.map((form) => (
              <TableRow key={form.id} onClick={() => handleClickFormRow(form.id)}>
                <TableCell>{form.id}</TableCell>
                <TableCell>{form.name}</TableCell>
                <TableCell>{getFieldCount(form)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyMessage>No forms found. Create a new form to get started.</EmptyMessage>
      )}
    </MainContainer>
  );
}
