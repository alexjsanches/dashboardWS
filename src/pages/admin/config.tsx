import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

interface IgnoredDate {
  id: number;
  date: string; // Formato 'yyyy-mm-dd'
}

const Config: React.FC = () => {
  const [ignoredDates, setIgnoredDates] = useState<IgnoredDate[]>([]);
  const [newDate, setNewDate] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3333/api/dates')
      .then((response) => {
        // Verifica se a resposta é um array antes de atribuir ao estado
        if (Array.isArray(response.data)) {
          setIgnoredDates(response.data);
        } else {
          console.error('A resposta do backend não é um array:', response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddDate = () => {
    if (newDate) {
      const newIgnoredDate: IgnoredDate = {
        id: Date.now(),
        date: newDate,
      };
      setIgnoredDates([...ignoredDates, newIgnoredDate]);
      setNewDate('');
    }
  };

  const handleDeleteDate = (id: number) => {
    const updatedDates = ignoredDates.filter((date) => date.id !== id);
    setIgnoredDates(updatedDates);
  };

  const handleSaveDates = () => {
    axios.post('http://localhost:3333/api/dates', { dates: ignoredDates })
      .then(() => console.log('Dates saved successfully'))
      .catch((error) => console.error(error));
  };

  return (
    <Flex direction="column" align="center" mt={4}>
      <Input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        mb={2}
      />
      <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={handleAddDate}>
        Adicionar Data
      </Button>
      <Table mt={4} variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Verifica se ignoredDates é um array antes de mapear */}
          {Array.isArray(ignoredDates) && ignoredDates.map((date) => (
            <Tr key={date.id}>
              <Td>{date.date}</Td>
              <Td>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  aria-label="Delete Date"
                  onClick={() => handleDeleteDate(date.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt={4} colorScheme="teal" onClick={handleSaveDates}>
        Salvar Datas
      </Button>
    </Flex>
  );
};

export default Config;
