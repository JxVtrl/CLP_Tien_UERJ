import { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Header } from "./sections/Header";
import { Main } from "./sections/Main";
import { InfoIcon } from "@chakra-ui/icons";
import { HelperModal, ModalInstructions } from "./components";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w="100%" direction="column" h="100vh" position="relative">
      <Header />
      <Main />
      <InfoIcon
        cursor="pointer"
        onClick={onOpen}
        size="md"
        boxSize="6"
        position="fixed"
        bottom="20px"
        right="20px"
      />
      <ModalInstructions isOpen={isOpen} onClose={onClose} />
      <HelperModal />
    </Flex>
  );
}

export default App;
