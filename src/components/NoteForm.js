import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE, UPDATE_NOTE } from "../config/mutations";

function NoteForm({
  noteId,
  initialTitle = "",
  initialBody = "",
  onCompleted,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const [addNote, { loading: adding, error: addError }] = useMutation(
    ADD_NOTE,
    {
      onCompleted,
    }
  );

  const [updateNote, { loading: updating, error: updateError }] = useMutation(
    UPDATE_NOTE,
    {
      onCompleted,
    }
  );

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteId) {
      updateNote({
        variables: { id: noteId, title, body },
      });
    } else {
      addNote({
        variables: { title, body },
      });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Judul Catatan</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel>Isi Catatan</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button
          mt={4}
          colorSchem  e="teal"
          type="submit"
          isLoading={adding || updating}
        >
          {noteId ? "Update" : "Tambah"} Catatan
        </Button>
        {addError && (
          <Text color="red.500">
            Gagal menambah catatan: {addError.message}
          </Text>
        )}
        {updateError && (
          <Text color="red.500">
            Gagal memperbarui catatan: {updateError.message}
          </Text>
        )}
      </form>
    </Box>
  );
}

export default NoteForm;
