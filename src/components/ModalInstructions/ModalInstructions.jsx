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
import {
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icons";

const ModalInstructions = ({ isOpen, onClose }) => {

  return (
    <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Regras de negócios</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <List>
            <Flex direction="column">
              <ListItem>
                <Text>
                  O usuário deve conseguir entrar com qualquer texto no input (Números e letras)
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  O usuário deve conseguir entrar com qualquer texto no input
                </Text>
              </ListItem>
            </Flex>
            <Divider borderColor="teal" />
            <Flex gap='5px' direction="column" mt="20px">
              <Text>Exemplos de entrada | NUMBER</Text>
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
              <Text>Exemplos de entrada | STRING</Text>
              <ListItem display="flex" align="center">
                <Flex align="center">
                  <ListIcon as={CheckCircleIcon} color="red.500" />
                  <Text>{"texto/={'Usuário'}"}</Text>
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
                  <Text>{"$texto /= 'Usuário' // Com espaços e entre aspas simples"}</Text>
                </Flex>
              </ListItem>
            </Flex>
          </List>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalInstructions;
