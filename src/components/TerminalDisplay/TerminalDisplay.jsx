import React from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";
import { useApp } from "../../context";
function TerminalDisplay() {
  const { result } = useApp();

  return (
    <Flex
      flexDir="column"
      overflow="auto"
      h="250px"
      p="15px"
      color="#fff"
      bgColor="rgba(0, 0, 0)"
      borderRadius="10px"
    >
      <Text color="#FFF" m="0 auto" textDecor="underline">
        Terminal
      </Text>
      <Divider m="10px 0" />
      {result.map((item, index) => (
        <Flex p="20px" overflowY="visible" key={index}>
          <Text color="green">{item}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default TerminalDisplay;
