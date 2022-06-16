import React, { useState, } from "react";
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

function AddProductType({ isOpen, onClose }) {
    const [type, setType] = useState();

    async function addType() {
        const response = await axios.post('good/addType', { typeName: type });
        onClose()
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Добавити тип продукту</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' value={type} onChange={(e) => setType(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={addType} colorScheme='blue' mr={3}>
                            Додати
                        </Button>
                        <Button onClick={onClose}>Скасувати</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AddProductType