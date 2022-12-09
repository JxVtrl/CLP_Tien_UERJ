import React from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";
import { useApp } from "../../context";

export const Terminal = () => {
  const { result } = useApp();

  return (
    <Flex
      flexDir="column"
      h="250px"
      p="15px"
      w="100%"
      color="#fff"
      bgColor="rgba(0, 0, 0)"
      borderRadius="10px"
    >
      <Text color="#FFF" m="0 auto" textDecor="underline">
        Terminal
      </Text>
      <Divider m="10px 0" />
    {result.map((item, index) => (
      <Flex key={index}><Text color='green'>{item}</Text></Flex>
    ))}
    </Flex>
  );
};
