import React, { useState } from "react";
import { Flex, Input, Button, Center, Divider, Text } from "@chakra-ui/react";
import { CheckIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  VariableDisplay,
  ExampleTable,
  TerminalDisplay,
} from "../../components";
import { useApp } from "../../context";

export const Main = () => {
  const { handleAddItem, expression, setExpression, setHelpBox, helpBox } =
    useApp();

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
        pb="20px"
      >
        <Flex justify="flex-start" w="100%" pl="20px">
          <Button
            onClick={() => {
              setHelpBox(!helpBox);
            }}
          >
            <QuestionOutlineIcon boxSize={5} />
          </Button>

          <Flex w="100%" gap="20px" maxW={"600px"} mr="20px">
            <Input
              w="100%"
              p="5px"
              ml="20px"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
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
        </Flex>
        <Flex
          direction="column"
          h="100%"
          justify="space-between"
          w="100%"
          mt="50px"
          px="20px"
          position="relative"
        >
          <TerminalDisplay />
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
