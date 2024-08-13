import { useState } from "react";
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(GET_NOTES);
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
            <NoteForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
