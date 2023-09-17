import React, { useState } from "react";
import { DialogContent, ModalClose } from "@mui/joy";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { AddPlantForm } from "./AddPlantForm";

export default function AddPlant() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpenModal(true)}>Add new plant</Button>
      <Modal keepMounted open={openModal} onClose={() => setOpenModal(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Add a new plant</DialogTitle>
          <DialogContent>
            <AddPlantForm />
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
