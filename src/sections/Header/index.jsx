import React from "react";
import { Flex, Text, Avatar, AvatarGroup } from "@chakra-ui/react";

export const Header = () => {
  return (
  <Flex w='100%' align='center' justify='space-between' p='10px'>
    <Text as='h1' letterSpacing='2px' fontWeight='600' fontSize='20px'>CLP - Tien</Text>
    <AvatarGroup>
        <Avatar src={"/joao.jpeg"}/>
        <Avatar src={"/marcelo.jpeg"}/>
        <Avatar src={""}/>
    </AvatarGroup>
  </Flex>
);
};
