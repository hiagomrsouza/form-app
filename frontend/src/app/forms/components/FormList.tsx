'use client'

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, getFieldCount, GetAllForms } from "../../../api/GetAllForms";
import { Colors } from "@/app/utils/Colors";
import { useRouter } from "next/navigation";
import { Button, ButtonContainer } from "@/app/components";

const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
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
  color: ${Colors.text.light};
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${Colors.text.critical};
  background-color: ${Colors.background.danger};;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: ${Colors.text.light};
  background-color: ${Colors.background.default};
  border-radius: 4px;
`;

export default function FormList() {
  const router = useRouter();

  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = async () => {
    try {
      setIsLoading(true);
      const formsData = await GetAllForms();
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
        <LoadingMessage>Loading forms...</LoadingMessage>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <ButtonContainer>
        <Button
          primary
          label="Create New Form"
          onClick={handleClickCreateForm}
        />
      </ButtonContainer>

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
