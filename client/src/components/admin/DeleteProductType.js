import React, {useState, useEffect, useContext} from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    FormControl,
    Input,
    FormLabel,
    ModalBody,
    ModalFooter
} from "@chakra-ui/react";
import axios from '../../utils/axios';
import { observer } from "mobx-react-lite";


const AddProductType = observer(({ isOpen, onClose }) => {
    const [ types, setTypes ] = useState([]);
    const [ type, setType ] = useState();
    
    async function getTypes() {
      const response = await axios.get('type/getAll');
      if (response.status === 200) {
        setTypes(response.data);
      }
    }

    async function deleteType(id) {
        const response = await axios.delete(`type/delete/${id}`);
        if (response.status === 200) {
          setTypes(response.data);
          onClose()
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Видалити тип продукту</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' value={type} onChange={(e) => setType(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={deleteType} colorScheme='blue' mr={3}>
                            Додати
                        </Button>
                        <Button onClick={onClose}>Скасувати</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
})

export default AddProductType