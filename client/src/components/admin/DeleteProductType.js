import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  SimpleGrid
} from "@chakra-ui/react";
import axios from "../../utils/axios";
import { observer } from "mobx-react-lite";

const AddProductType = observer(({ isOpen, onClose }) => {
  const [types, setTypes] = useState([]);
  const [deleteList, setDeleteList] = useState([]);

  async function getTypes() {
    const response = await axios.get("type/getAll");
    if (response.status === 200) {
      setTypes(response.data);
    }
  }

  function addTypeToDelete(id) {
    setDeleteList([...deleteList, id])
  }

  function removeTypeFromDeleteList(id) {
    setDeleteList(deleteList.filter((typeId) => typeId !== id));
  }

  async function deleteTypes() {
    const response = await axios.post(`type/delete`, { deleteList });
    if (response.status) {
      getTypes();
      onClose();
    }
  }

  useEffect(() => {
    getTypes();
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Видалити типи продукту</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid templateColumns="1fr 1fr 1fr">
              {types &&
                types.map((type) =>
                  <Checkbox colorScheme="red" onChange={(e) => e.target.checked ? addTypeToDelete(type.id) : removeTypeFromDeleteList(type.id)}>
                    {type.name}
                  </Checkbox>
                )}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={deleteTypes} colorScheme="red" mr={3}>
              Видалити
            </Button>
            <Button onClick={onClose}>Скасувати</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default AddProductType;
