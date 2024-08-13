import { FormControl, FormLabel, Input, Textarea, Button, Box } from '@chakra-ui/react';
import { useState } from 'react';

function NoteForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Judul Catatan</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Isi Catatan</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">Simpan</Button>
      </form>
    </Box>
  );
}

export default NoteForm;