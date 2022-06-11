import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import {
    useDisclosure,
    Button,
    Box,
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
import { useNavigate } from "react-router-dom";
// import 'react-image-crop/dist/ReactCrop.css'
import ImageCropper from '../cropImage';
// function Dropzone() {
//     const onDrop = useCallback(acceptedFiles => {
//         // Do something with the files
//     }, [])
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

//     return (
//         <Box w="170px" h='170px' borderColor="gray.500" borderWidth='2px' rounded={10} {...getRootProps()}>
//             <input {...getInputProps()} />
//             {
//                 isDragActive ?
//                     <p>Drag</p> :
//                     <p>Drop</p>
//             }
//         </Box>
//     )
// }

const NewProduct = observer(({ isOpen, onClose }) => {
    const navigator = useNavigate();
    const [info, setInfo] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [typeID, setTypeID] = useState("1")
    const [types, setTypes] = useState([])
    const [image, setImage] = useState(null)
    const [state, setState] = useState("")
    const is = ["В наявності", "Закінчується", "Закінчився", "Очікується"]

    const [croppedImage, setCroppedImage] = useState(undefined);

    const selectFile = event => {
        // if (event.target.files && event.target.files.length > 0) {
        //     const reader = new FileReader();

        //     reader.addEventListener('load', () =>
        //         setImage(reader.result)
        //     );

        //     reader.readAsDataURL(event.target.files[0]);
        // }
        setImage(event.target.files[0]);
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

    const submit = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append("image", image)
        formData.append('typeID', typeID)
        formData.append('state', state)
        formData.append('info', JSON.stringify(info))
        const response = await axios.post('https://mydiplomlevas.herokuapp.com/good/create', formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem('Token')
            }
        })
        if (response.status === 200) {
            onClose()
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
                            {/* <Dropzone /> */}
                            <FormLabel>Фото</FormLabel>
                            <input accept="image/*" type="file" name="avatar" id="reg-avatar" onChange={selectFile} />
                        </FormControl>
                        {image &&
                            <ImageCropper imageToCrop={image} onImageCropped={(croppedImage) => setCroppedImage(croppedImage)} />
                        }
                        {
                            croppedImage &&
                            <div>
                                <h2>Cropped Image</h2>
                                <img
                                    alt="Cropped Image"
                                    src={croppedImage}
                                />
                            </div>
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