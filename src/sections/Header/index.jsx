import React from "react";
import { Flex, Text, Avatar, AvatarGroup } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex w="100%" align="center" justify="space-between" p="10px">
      <Text as="h1" letterSpacing="2px" fontWeight="600" fontSize="20px">
        CLP - Tien
      </Text>
      <AvatarGroup>
        <Avatar src={"/joao_vitral.jpeg"} />
        <Avatar src={"/marcelo_bracet.jpeg"} />
        <Avatar src={"/matteus_fermino.jpg"} />
        <Avatar src={"/victor_hugo.jpg"} />
        <Avatar src={"/joao_vitor.jpg"} />
        <Avatar src={"/matheus.jpg"} />
      </AvatarGroup>
    </Flex>
  );
};
