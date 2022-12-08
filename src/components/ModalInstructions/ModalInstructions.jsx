import React from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ListIcon,
  ListItem,
  Text,
  List,
  Divider,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

const ModalInstructions = ({ isOpen, onClose }) => {
  return (
    <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h1" textDecor="underline">
          Regras de negócios
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <List>
            <Flex mb="10px" direction="column">
              <ListItem>
                <Text fontWeight="600" as="h2">
                  O usuário deve conseguir entrar com qualquer texto no input
                  (Números e letras)
                </Text>
              </ListItem>
              <ListItem></ListItem>
            </Flex>
            <Divider borderColor="teal" />
            <Flex gap="40px" direction="column" mt="20px">
              <Flex gap="10px" direction="column">
                <Text fontWeight="bold" as="h2">
                  Exemplos de entrada | number
                </Text>
                <ListItem display="flex" align="center">
                  <Flex align="center">
                    <ListIcon as={CheckCircleIcon} color="red.500" />
                    <Text>{"valor /={2+3}"}</Text>
                  </Flex>
                </ListItem>

                <ListItem>
                  <Flex align="center">
                    <ListIcon as={WarningIcon} color="yellow.500" />
                    <Text>{"$texto/={um pequeno texto} // Sem espaço"}</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text>{"$valor /= {2 + 3}"}</Text>
                  </Flex>
                </ListItem>
              </Flex>

              <Flex gap="10px" direction="column">
                <Text fontWeight="bold" as="h2">
                  Exemplos de entrada | string
                </Text>
                <ListItem display="flex" align="center">
                  <Flex align="center">
                    <ListIcon as={CheckCircleIcon} color="red.500" />
                    <Text>{"texto /= {'Usuário'}"}</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <ListIcon as={WarningIcon} color="yellow.500" />
                    <Text>{"$texto/='um pequeno texto' // Sem espaço"}</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    <Text>
                      {
                        "$texto /= 'Usuário' // Com espaços e entre aspas simples"
                      }
                    </Text>
                  </Flex>
                </ListItem>
              </Flex>
            </Flex>
          </List>
        </ModalBody>

        <ModalFooter>
          <Button _hover={{ bgColor: "red.500" }} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalInstructions;
