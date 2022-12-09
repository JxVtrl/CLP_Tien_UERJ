import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useApp } from "../../context";
import ExampleTable from "../ExampleTable/ExampleTable";

function HelperModal() {
  const { helpBox, setHelpBox } = useApp();
  return (
    <Drawer
      onOverlayClick={() => setHelpBox(false)}
      isOpen={helpBox}
      placement="left"
      onClose={() => setHelpBox(false)}
      size='xl'
    >
      <DrawerOverlay />
      <DrawerContent w>
        <DrawerCloseButton />
        <DrawerHeader>Examples</DrawerHeader>

        <DrawerBody>
          <ExampleTable />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default HelperModal;
