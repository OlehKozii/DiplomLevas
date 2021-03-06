import React from "react";
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

function Users({ isOpen, onClose }) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Користувачі</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Додати
                        </Button>
                        <Button onClick={onClose}>Скасувати</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default Users