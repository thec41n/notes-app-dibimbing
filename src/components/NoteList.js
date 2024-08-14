import { Box, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";

function NoteList({ notes }) {
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
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}

export default NoteList;
