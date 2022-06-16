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
    ModalFooter,
    Textarea
} from "@chakra-ui/react";
import axios from '../../utils/axios';


function EditArticle({ isOpen, onClose, cb, articletext, articlename, articleid }) {
    const [text, setText] = useState()
    const [name, setName] = useState()
    const editArticle = async () => {

        const response = await axios.put(`user/editarticle/${articleid}`, { text, header: name });
        if (response.status === 200) onClose();
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Редагувати статтю</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' defaultValue={articlename} value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Textarea h="400px" placeholder='Текст статті' defaultValue={articletext} value={text} onChange={(e) => setText(e.target.value)} />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={editArticle}>
                            Додати
                        </Button>
                        <Button onClick={() => { onClose() }}>Скасувати</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default EditArticle