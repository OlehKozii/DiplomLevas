import React, { useEffect, useState } from "react";
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
    Select
} from "@chakra-ui/react";
import axios from '../../utils/axios';
import { observer } from "mobx-react-lite";
import ImageCropper from '../cropImage';

const NewProduct = observer(({ isOpen, onClose, cb }) => {
    const [info, setInfo] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [typeID, setTypeID] = useState("1")
    const [types, setTypes] = useState([])
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [state, setState] = useState("В наявності")
    const is = ["В наявності", "Закінчується", "Закінчився", "Очікується"]

    const [croppedImage, setCroppedImage] = useState(undefined);

    const selectFile = event => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener('load', () =>
                setImageUrl(reader.result)
            );

            reader.readAsDataURL(event.target.files[0]);
            setImage(event.target.files[0]);
        }
    }

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

    const submit = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append("image", croppedImage)
        formData.append('typeID', typeID)
        formData.append('state', state)
        formData.append('info', JSON.stringify(info))
        axios.post('good/create', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
            .then(() => {
                cb();
                onClose();
            })
    }

    const close = () => {
        setInfo([])
        setName("")
        setPrice(0)
        setTypeID("1")
        setImage(null)
        setImageUrl(null)
        setState("")
        onClose();
    }


    const getTypes = async () => {
        const response = await axios.get('type/getAll');
        if (response.status === 200) setTypes(response.data);
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
                    <ModalHeader>Добавити продукт</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Фото</FormLabel>
                            <input accept="image/*" type="file" name="avatar" id="reg-avatar" onChange={selectFile} />
                        </FormControl>
                        {image &&
                            <ImageCropper imageToCrop={imageUrl} onImageCropped={(croppedImage) => setCroppedImage(croppedImage)} />
                        }
                        <FormControl>
                            <FormLabel></FormLabel>
                            <FormLabel>Назва</FormLabel>
                            <Input placeholder='Назва' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ціна</FormLabel>
                            <Input placeholder='Ціна' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Тип</FormLabel>
                            <Select placeholder="Виберіть тип" onChange={(e) => setTypeID(e.target.value)} value={typeID}>
                                {types.map(i =>
                                    <option key={i.id}>{i.name}</option>
                                )}
                            </Select>
                            <FormLabel>Наявність на складі</FormLabel>
                            <Select placeholder="Виберіть стан" onChange={(e) => setState(e.target.value)} value={state}>
                                {is.map(i =>
                                    <option key={i}>{i}</option>
                                )}
                            </Select>
                        </FormControl>
                        <FormLabel></FormLabel>
                        <FormLabel>Властивості</FormLabel>

                        <FormControl marginBottom="5px" my="15px" display="flex" justifyContent="center" >
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
export default NewProduct