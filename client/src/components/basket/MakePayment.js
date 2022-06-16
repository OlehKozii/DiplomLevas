import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Flex,
    Text
} from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../../utils/axios';

function MakePayment({ isOpen, onClose, userId, basket, price, cb }) {
    const elements = useElements();
    const stripe = useStripe();
    const [rate, setRate] = useState(null);


    async function getRate() {
        fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/uah.json')
            .then((res) => res.json())
            .then((res) => setRate(res.uah.usd))
    }

    async function submit() {
        if (!stripe || !elements) {
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        const intentData = await axios.post("/stripe", {
            price: Math.round(price * rate * 100) / 100
        })
            .then((response) => {
                return {
                    secret: response.data.client_secret,
                    id: response.data.intent_id,
                };
            },
                (error) => {
                    console.log(error)
                    return error;
                }
            );

        const result = await stripe.confirmCardPayment(intentData.secret, {
            payment_method: payload.paymentMethod.id,
        });

        if (result.error) {
            console.log(result.error);
            return
        }

        if (result.paymentIntent.status === "succeeded") {
            const confirmedPayment = await axios
                .post("/confirm-payment", {
                    payment_id: intentData.id,
                    payment_type: "stripe",
                })
                .then(
                    (response) => {
                        return response.data.success;
                    },
                    (error) => {
                        console.log(error);
                        return error;
                    }
                );

            cb();
            onClose();
        }
    }

    useEffect(() => {
        getRate()
    }, []);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text w="100%" textAlign="center" fontSize="30px">
                            Оплата
                        </Text>
                    </ModalHeader>

                    <ModalBody>
                        <CardElement style={{ fontSize: '30px' }} />
                    </ModalBody>

                    <ModalFooter display="flex" justifyContent="space-between">
                        <Text fontSize="25px">{Math.round(price * rate * 100) / 100}$</Text>
                        <Flex alignItems="center">
                            <Button colorScheme='blue' mr={3} onClick={submit}>
                                Підтвердити
                            </Button>
                            <Button onClick={onClose}>Скасувати</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default MakePayment