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
  useToast,
} from "@chakra-ui/react";
import { useApp } from "../../context";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ExampleTable() {
  const { setHelpBox, exampleList, setExpression } = useApp();
  const toast = useToast();

  return (
    <Flex w="100%" px="10px" borderRadius="10px">
      <TableContainer w="100%">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th textAlign="center">Tipo de operação</Th>
              <Th textAlign="center">Expressão exemplo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {exampleList.map((item) => (
              <Tr key={item.id}>
                <Td textAlign="center">{item.type}</Td>
                <CopyToClipboard text={item.expression}>
                  <Td
                    textAlign="center"
                    onClick={() => {
                      setHelpBox(false);
                      setExpression(item.expression)
                      return toast({
                        title: "Expressão copiada.",
                        description:
                          "Expressão copiada com sucesso para a área de transferência.",
                        status: "success",
                        duration: 1200,
                        isClosable: true,
                      });
                    }}
                    cursor="pointer"
                    transition="all 0.3s linear"
                    _hover={{
                      backgroundColor: "#c6c6c6 !important",
                      fontWeight: 600,
                    }}
                  >
                    {item.expression}
                  </Td>
                </CopyToClipboard>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ExampleTable;
