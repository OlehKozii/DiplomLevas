import React, { useEffect, useState } from "react";
import {
    useDisclosure,
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
    Select
} from "@chakra-ui/react";
import axios from "axios";
import { observer } from "mobx-react-lite";

const NewProduct = observer(({ isOpen, onClose }) => {
    const [info, setInfo] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [typeID, setTypeID] = useState("")
    const [types, setTypes] = useState([])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
        console.log(info)
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const submit = async () => {
        const response = await axios.post('https://mydiplomlevas.herokuapp.com/good/create', {});
        if (response.status === 200) {
            navigator('/admin');
        };
    }

    const getTypes = async () => {
        const response = await axios.get('https://mydiplomlevas.herokuapp.com/type/getAll');
        if (response.status === 200) setTypes(response.data);
    }

    useEffect(() => {
        getTypes();
    }, []);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Добавити продукт</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Фото</FormLabel>
                            <input accept="image/*" type="file" name="avatar" id="reg-avatar" />
                        </FormControl>
                        <FormControl>
                            <FormLabel></FormLabel>
                            <FormLabel>Назва</FormLabel>

                            <Input placeholder='Назва' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ціна</FormLabel>
                            <Input placeholder='Ціна' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Тип</FormLabel>
                            <Select>
                                {types.map(i =>
                                    <option key={i.id}>{i.name}</option>
                                )}


                            </Select>
                        </FormControl>
                        <FormLabel></FormLabel>
                        <FormLabel>Властивості</FormLabel>

                        <FormControl style={{ marginBottom: "5px" }}>
                            <Button colorScheme="green"
                                onClick={addInfo}>Добавити властивості</Button>

                        </FormControl>
                        {info.map(i =>
                            <FormControl key={i.number} style={{ display: "flex", marginBottom: "5px" }}>
                                <div style={{ marginRight: "5px" }}>
                                    <Input placeholder='Назва'
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)} />

                                </div>
                                <div style={{ marginRight: "5px" }}>
                                    <Input placeholder='Значення'
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)} />
                                </div>
                                <div>
                                    <Button colorScheme="red"
                                        onClick={() => removeInfo(i.number)}>-</Button>
                                </div>
                            </FormControl>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
})
export default NewProduct