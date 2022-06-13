import React, { useState, useEffect, useContext } from "react";
import {
    Select,
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
import { observer } from "mobx-react-lite";
import axios from '../../utils/axios';
import { Context } from "../..";

const EditProduct = observer(({ isOpen, onClose }) => {
    const { good } = useContext(Context);
    const [ name, setName ] = useState();
    const [ price, setPrice ] = useState();

    // const [types, setTypes] = useState([])
    // const is = ["В наявності", "Закінчується", "Закінчився", "Очікується"]

    const submit = async () => {
        const response = await axios.put(`good/${good.id}`, {
            name: name ?? good.name, 
            price: price ?? good.price
        })
        if (response.status === 200) {
            onClose()
        };
    }

    // const getTypes = async () => {
    //     const response = await axios.get('type/getAll');
    //     if (response.status === 200) setTypes(response.data);
    // }
 
    const close = () => {
        setName();
        setPrice();
        onClose();
    }

    // useEffect(() => {
    //     getTypes();
    // }, []);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={close}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Редагувати продукт</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' defaultValue={good.name} value={name} onChange={(e) => setName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ціна</FormLabel>
                            <Input placeholder='Ціна' defaultValue={good.price} value={price} onChange={(e) => setPrice(e.target.value)} />
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Тип</FormLabel>
                            <Select placeholder="Виберіть тип">
                                {types.map(i =>
                                    <option key={i.id} onClick={() => setTypeID(i.id)}>{i.name}</option>
                                )}
                            </Select>
                            <FormLabel>Наявність на складі</FormLabel>
                            <Select placeholder="Виберіть стан">
                                {is.map(i =>
                                    <option key={i} onClick={() => setState(i)}>{i}</option>
                                )}
                            </Select>
                        </FormControl> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={submit}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
})

export default EditProduct