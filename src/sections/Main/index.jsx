import React, { useState } from "react";
import {
  Flex,
  Input,
  Button,
  Center,
  Divider,
  Text,
  Grid,
} from "@chakra-ui/react";
import { CheckIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  VariableDisplay,
  TerminalDisplay,
  HistoryDisplay,
} from "../../components";
import { useApp } from "../../context";

export const Main = () => {
  const { handleAddItem, expression, setExpression, setHelpBox, helpBox } =
    useApp();

  return (
    <Grid gridTemplateColumns={"1fr 0.01fr 1fr"} overflow='hidden'>
      <Flex
        w="100%"
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

          <Flex w="100%" gap="20px" maxW="600px" mr="20px">
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
          h="100%"
          w="100%"
          direction="column"
          mt="50px"
          px="20px"
          position="relative"
          gap="20px"
          overflow="hidden"
        >
          <TerminalDisplay />
          <HistoryDisplay />
        </Flex>
      </Flex>

      <Center height="100%">
        <Divider borderColor="teal" orientation="vertical" />
      </Center>

      <Flex
        flex="1"
        justify="center"
        w="100%"
        px="20px"
        h='100%'
      >
        <VariableDisplay />
      </Flex>
    </Grid>
  );
};
