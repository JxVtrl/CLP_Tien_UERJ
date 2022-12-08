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
      px="20px"
      justifyContent="space-between"
      align="flex-start"
    >
      <Flex flexDir="column" align="center" w="50%" position='relative'>
        <Flex>
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
        <Flex w='100%' mt="50px">
          <Terminal />
        </Flex>
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
