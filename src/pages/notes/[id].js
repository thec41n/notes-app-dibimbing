import {
  Box,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTE_BY_ID } from "../../config/query";
import { DELETE_NOTE } from "../../config/mutations";
import moment from "moment";
import NoteForm from "../../components/NoteForm";
import { useState, useEffect } from "react";

function NoteDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [deleteNote] = useMutation(DELETE_NOTE, {
    onCompleted: () => {
      toast({
        title: "Catatan Berhasil Dihapus!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
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

  useEffect(() => {
    if (localStorage.getItem("showToast") === "true") {
      toast({
        title: "Catatan Berhasil Diupdate!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.removeItem("showToast");
    }
  }, [toast]);

  const { loading, error, data } = useQuery(GET_NOTE_BY_ID, {
    skip: !id,
    variables: { id },
  });

  if (!id) {
    return <Text>Loading...</Text>;
  }

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const note = data?.note;

  if (!note) {
    return <Text>Catatan tidak ditemukan.</Text>;
  }

  const formattedDate = moment(parseInt(note.createdAt, 10)).format("LLL");

  const handleCompleted = () => {
    setIsEditing(false);
    localStorage.setItem("showToast", "true");
    window.location.reload();
  };

  const handleDelete = () => {
    const confirmDelete = confirm(
      "Apakah Anda Yakin Ingin Menghapus Catatan Ini?"
    );
    if (confirmDelete) {
      deleteNote({
        variables: { id },
      }).then(() => {
        router.push("/").then(() => {
          window.location.reload();
        });
      });
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="xl">{note.title}</Text>
      <Text mt={4}>{note.body}</Text>
      <Text mt={4}>Dibuat pada: {formattedDate}</Text>
      <Button mt={4} mr={2} colorScheme="teal" onClick={onOpen}>
        Edit
      </Button>
      <Button mt={4} mr={2} colorScheme="red" onClick={handleDelete}>
        Hapus
      </Button>
      <Button mt={4} colorScheme="gray" onClick={() => router.push("/")}>
        Kembali ke Daftar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Catatan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NoteForm
              noteId={id}
              initialTitle={note.title}
              initialBody={note.body}
              onCompleted={handleCompleted}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NoteDetail;
