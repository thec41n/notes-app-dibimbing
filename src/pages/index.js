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
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Catatan Pertama",
      body: "Isi dari catatan pertama.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Catatan Kedua",
      body: "Isi dari catatan kedua.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Catatan Ketiga",
      body: "Isi dari catatan ketiga.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: "Catatan Keempat",
      body: "Isi dari catatan keempat.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: "Catatan Kelima",
      body: "Isi dari catatan kelima.",
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <Box>
      <Navbar onOpen={onOpen} />
      <NoteList notes={notes} />
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
