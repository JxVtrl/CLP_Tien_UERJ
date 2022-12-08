import React from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";
import { useApp } from "../../context";

export const Terminal = () => {
  const { result } = useApp();

  return (
    <Flex
      flexDir="column"
      position="fixed"
      h="250px"
      w="45%"
      p="15px"
      bottom="20px"
      mx='auto'
      color="#fff"
      bgColor="rgba(0, 0, 0, 0.9)"
      borderRadius="10px"
      alignSelf="flex-end"
      justifySelf="flex-end"
    >
      <Text m="0 auto" textDecor="underline">
        Terminal
      </Text>
      <Divider m="10px 0" />
      <Text>Resultado: {result}</Text>
    </Flex>
  );
};
