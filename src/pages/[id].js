import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function NoteDetail() {
  const router = useRouter();
  const { id } = router.query;

  const note = { id, title: "Contoh Judul", body: "Ini adalah isi catatan." };

  if (!note) {
    return <Text>Catatan tidak ditemukan.</Text>;
  }

  return (
    <Box p={5}>
      <Text fontSize="xl">{note.title}</Text>
      <Text mt={4}>{note.body}</Text>
      <Button mt={4} colorScheme="teal" onClick={() => router.push('/')}>Kembali ke Daftar</Button>
    </Box>
  );
}

export default NoteDetail;