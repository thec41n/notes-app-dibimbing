import { Box, Text, Button } from '@chakra-ui/react';

function NoteList({ notes }) {
  if (!notes || notes.length === 0) {
    return <Text>Tidak ada catatan.</Text>;
  }

  return (
    <Box>
      {notes.map(note => (
        <Box key={note.id} p={5} shadow="md" borderWidth="1px">
          <Text mt={2}>{note.title}</Text>
          <Text mt={2}>{note.body}</Text>
          <Button colorScheme="teal" size="sm">Detail</Button>
        </Box>
      ))}
    </Box>
  );
}

export default NoteList;