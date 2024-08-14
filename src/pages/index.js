import { useState, useEffect } from "react";
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import { GET_NOTES } from "../config/mutations";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(GET_NOTES);
  const toast = useToast();

  useEffect(() => {
    const toastStatus = localStorage.getItem("showToast");
    if (toastStatus === "added") {
      toast({
        title: "Catatan Berhasil Ditambahkan!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.removeItem("showToast");
    }
  }, [toast]);

  const handleCompleted = () => {
    localStorage.setItem("showToast", "added");
    window.location.reload();
  };

  return (
    <Box>
      <Navbar onOpen={onOpen} />
      <NoteList notes={loading ? [] : error ? [] : data.notes} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Catatan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NoteForm onCompleted={handleCompleted} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}