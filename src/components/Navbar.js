import { Flex, Box, Button, Text } from "@chakra-ui/react";

function Navbar({ onOpen }) {
  return (
    <Flex
      bg="teal.500"
      p={4}
      color="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="xl">Notes App</Text>
      <Button
        onClick={onOpen}
        colorScheme="teal.500"
        variant="outline"
        _hover={{ bg: 'teal.600' }}
      >
        Tambah Catatan
      </Button>
    </Flex>
  );
}

export default Navbar;