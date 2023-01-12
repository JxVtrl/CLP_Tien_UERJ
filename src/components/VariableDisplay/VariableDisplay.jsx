import React, { useEffect } from "react";
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
  const { variableList, setExpression, expression } = useApp();

  // useEffect(() => {
  //   console.log(variableList)
  // }, [])

  const handleInputExpression = (id) => {
    if (variableList[id].expression !== undefined)
      setExpression(variableList[id].expression);
  };

  return (
    <Flex
      
      w="100%"
      borderRadius="10px"
    >
      <TableContainer w="100%">
        <Table variant="striped" w="100%" overflow='scroll'>
          <Thead>
            <Tr>
              <Th textAlign="center">Expressão originária</Th>
              <Th textAlign="center">Nome da Variável</Th>
              <Th textAlign="center">Valor atribuído</Th>
              <Th textAlign="center">Tipo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {variableList.length > 0 &&
              variableList.map((item) => (
                <Tr key={item.id}>
                  <Td
                    textAlign="center"
                    onClick={() => handleInputExpression(item.id)}
                    cursor="pointer"
                    transition="all 0.3s linear"
                    _hover={{
                      backgroundColor: "#c6c6c6 !important",
                      fontWeight: 600,
                    }}
                  >
                    {item.expression}
                  </Td>
                  <Td textAlign="center">{item.variable}</Td>
                  <Td textAlign="center">{item.values}</Td>
                  <Td textAlign="center">{item.type}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default VariableDisplay;
