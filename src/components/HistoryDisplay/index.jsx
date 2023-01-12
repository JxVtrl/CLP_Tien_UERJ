import React from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";
import { useApp } from "../../context/AppContext";

export const HistoryDisplay = () => {
  const { history, setExpression } = useApp();
  return (
    <Flex
      borderRadius="10px"
      p="20px"
      overflow="hidden"
      bgColor="#edf2f7"
      direction="column"
      gap="12px"
      h="250px"
    >
      <Text textAlign="center">Histórico</Text>
      <Divider borderColor="#000" />

      {history.length > 0 &&
        history.map((item, index) => (
          <Text
            p="10px"
            _hover={{
              fontWeight: 600,
            }}
            cursor="pointer"
            onClick={() => setExpression(item)}
            key={index}
          >
            {item}
          </Text>
        ))}
    </Flex>
  );
};
