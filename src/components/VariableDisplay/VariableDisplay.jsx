import React from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useApp } from "../../context";

function VariableDisplay() {
  const { variableList, setVariableList } = useApp();

  return (
    <Flex w="100%" px="10px" borderRadius="10px">
      <TableContainer w="100%">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th textAlign="center">Expressão originária</Th>
              <Th textAlign="center">Variável</Th>
              <Th textAlign="center">Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {variableList.length > 0 &&
              variableList.map((item) => (
                <Tr key={item.id}>
                  <Td textAlign="center">{item.expression}</Td>
                  <Td textAlign="center">{item.variable}</Td>
                  <Td textAlign="center">{item.values}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default VariableDisplay;
