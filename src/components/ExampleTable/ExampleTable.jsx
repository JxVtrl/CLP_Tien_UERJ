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

const exampleList = [
  {
    id: 0,
    type: "Atribuição Number 01",
    expression: "$exemplo /= {2+3}",
  },
  {
    id: 1,
    type: "Atribuição Number 02",
    expression: "$exemplo /= 2+3",
  },
  {
    id: 2,
    type: "Atribuição String 01",
    expression: "$exemplo /= {'Exemplo'}",
  },
  {
    id: 3,
    type: "Atribuição String 02",
    expression: "$exemplo /= 'Exemplo'",
  },
  {
    id: 4,
    type: "Atribuição String 03",
    expression: "$exemplo /= '3 + 5'",
  },
  {
    id: 5,
    type: "Definição de um Paragrafo 01",
    expression: "/P{bold|'Exemplo'}",
  },
  {
    id: 6,
    type: "Definição de um Paragrafo 02",
    expression: "/P{italic|'Exemplo'}",
  },
  {
    id: 7,
    type: "Definição de um Paragrafo 03",
    expression: "/P{underline|'Exemplo'}",
  },
  {
    id: 8,
    type: "Definição de um Paragrafo 03",
    expression: "/P{underline|'Exemplo'}",
  },
  {
    id: 9,
    type: "Definição de uma lista 01",
    expression: "/L{1|2|3|'teste'|5|'exemplo'|7|8|9|10}",
  },
  {
    id: 10,
    type: "Definição de uma lista 02",
    expression: "$valor /= /l{1|2|3|4|5|6|7|8|9|10}",
  },
  {
    id: 11,
    type: "Definição de uma tabela 01",
    expression: "/T{..|..}",
  },
  {
    id: 12,
    type: 'Definição de uma texto que será repetido "n" vezes',
    expression: "/R{5|'Exemplo'}",
  },
  {
    id: 13,
    type: 'Definição de um ternário',
    expression: "/I{2 < 3|'Exemplo verdadeiro'|'Exemplo falso'}",
  }
];

function ExampleTable() {
  const { setHelpBox } = useApp()
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
