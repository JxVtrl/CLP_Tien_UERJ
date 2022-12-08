import React, { useState } from "react";
import { Flex, Input, Button, Center, Divider, Text } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { VariableDisplay } from "../../components";
import { useApp } from "../../context";
import { Terminal } from "../../components/Terminal";

export const Main = () => {
  const { handleAddItem, expression, setExpression } = useApp();

  return (
    <Flex
      w="100%"
      h="100%"
      justifyContent="space-between"
      align="flex-start"
      flex="1"
    >
      <Flex
        flex="1"
        h="100%"
        flexDir="column"
        align="center"
        position="relative"
        justifyContent="space-between"
        pb='20px'
      >
        <Flex>
          <Input
            p="5px"
            ml="20px"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            w="200px"
            placeholder="Expressão"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
              }
            }}
          />
          <Button
            onClick={() => handleAddItem()}
            colorScheme="teal"
            variant="ghost"
          >
            <CheckIcon />
          </Button>
        </Flex>
        <Flex w="100%" mt="50px" px="20px" position="relative">
          <Terminal />
        </Flex>
      </Flex>
      <Center height="100%">
        <Divider borderColor="teal" orientation="vertical" />
      </Center>
      <Flex flex="1" justify="center">
        <VariableDisplay />
      </Flex>
    </Flex>
  );
};
