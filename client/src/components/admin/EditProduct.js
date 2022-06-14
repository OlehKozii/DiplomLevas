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

const EditProduct = observer(({ isOpen, onClose, cb }) => {
    const { good } = useContext(Context);
    const [ name, setName ] = useState();
    const [ price, setPrice ] = useState();
    const [ typeID, setTypeID ] = useState();
    const [ state, setState ] = useState();
    const [info, setInfo] = useState([])

    const [types, setTypes] = useState([])
    const is = ["В наявності", "Закінчується", "Закінчився", "Очікується"]

    const submit = async () => {
        const response = await axios.put(`good/${good.id}`, {
            name: name ?? good.name, 
            price: price ?? good.price,
            state: state ?? good.status,
            typeID: typeID ?? good.typeID,
            info: JSON.stringify(info ?? good.params)
        })
        if (response.status === 200) {
            cb();
            onClose()
        };
    }

    const getTypes = async () => {
        const response = await axios.get('type/getAll');
        if (response.status === 200) setTypes(response.data);
    }
 
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const close = () => {
        setName();
        setPrice();
        onClose();
    }

    useEffect(() => {
        getTypes();
    }, []);

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
                        <FormControl>
                            <FormLabel>Тип</FormLabel>
                            <Select placeholder="Виберіть тип">
                                {types.map(i =>
                                    <option key={i.id} selected={good.typeID === i.id} onClick={() => setTypeID(i.id)}>{i.name}</option>
                                )}
                            </Select>
                            <FormLabel>Наявність на складі</FormLabel>
                            <Select placeholder="Виберіть стан" defaultValue={good.state} onChange={(e) => setState(e.target.value)} value={state}>
                                {is.map(i =>
                                    <option key={i}>{i}</option>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl my="15px" display="flex" justifyContent="center">
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