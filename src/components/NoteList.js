import { Box, Text, Button, useToast } from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../config/mutations";

function NoteList({ notes }) {
  const toast = useToast();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: ["GetNotes"],
    onCompleted: () => {
      toast({
        title: "Catatan Berhasil Dihapus!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal Menghapus Catatan.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = confirm("Apakah Anda Yakin Ingin Menghapus Catatan Ini?");
    if (confirmDelete) {
      deleteNote({
        variables: { id },
      }).catch((error) => {
        console.error("Error deleting note:", error);
      });
    }
  };

  if (!notes || notes.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <Text>Tidak ada catatan.</Text>
      </Box>
    );
  }

  return (
    <Box>
      {notes.map((note) => {
        const formattedDate = moment(parseInt(note.createdAt, 10)).format(
          "LLL"
        );

        return (
          <Link href={`/notes/${note.id}`} passHref key={note.id}>
            <Box p={5} shadow="md" borderWidth="1px" cursor="pointer">
              <Text mt={2}>{note.title}</Text>
              <Text mt={2}>{note.body}</Text>
              <Text mt={2}>Dibuat pada: {formattedDate}</Text>
              <Button
                colorScheme="teal"
                size="sm"
                mt={4}
                onClick={(e) => e.stopPropagation()}
              >
                Detail
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                mt={4}
                ml={2}
                onClick={(e) => {
                  e.stopPropagation(); 
                  e.preventDefault();
                  handleDelete(note.id);
                }}
              >
                Hapus
              </Button>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}

export default NoteList;