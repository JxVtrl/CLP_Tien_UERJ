import React, { useState } from "react";
import { Flex, Input, Button, Center, Divider } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { VariableDisplay } from "../../components";
import { useApp } from "../../context";

export const Main = () => {
  const { handleAddItem, setExpression, expression } = useApp();

  return (
    <Flex
      w="100%"
      h="100%"
      px="20px"
      justifyContent="space-between"
      align="flex-start"
    >
      <Flex justify="center" w="50%">
        <Input
          p="5px"
          ml="20px"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          w="200px"
          placeholder="Expressão"
        />
        <Button
          onClick={() => handleAddItem()}
          colorScheme="teal"
          variant="ghost"
        >
          <CheckIcon />
        </Button>
      </Flex>
      <Center height="500px">
        <Divider borderColor="teal" orientation="vertical" />
      </Center>
      <Flex w="50%" justify="center">
        <VariableDisplay />
      </Flex>
    </Flex>
  );
};
