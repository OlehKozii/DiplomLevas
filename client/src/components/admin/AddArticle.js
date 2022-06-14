import React, { useState } from "react";
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
    Textarea,
    ModalFooter
} from "@chakra-ui/react";
import axios from "../../utils/axios";


function AddArticle({ isOpen, onClose, cb }) {
    const [header, setHeader] = useState();
    const [text, setText] = useState();

    function addArticle() {
        axios.post('user/createArticle', {header, text})
             .then(() => {
                cb();
                onClose();
             })
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Додати статтю</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' value={header} onChange={(e) => setHeader(e.target.value)} />
                            <FormLabel>Текст статті</FormLabel>
                            <Textarea h="400px" placeholder='Текст статті' value={text} onChange={(e) => setText(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={addArticle} colorScheme='blue' mr={3}>
                            Додати
                        </Button>
                        <Button onClick={onClose}>Скасувати</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AddArticle