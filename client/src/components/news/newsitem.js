import { Container, Heading, Flex, Text, Spacer } from '@chakra-ui/react'
import React from 'react'

const article = { "name": "Чому потрібно їсти овочі" }

const NewsItem = ({header, text, time}) => {
    return (
        <Container style={{
            minWidth: '75%', border: "solid", margin: "auto", justifyContent: 'center', marginTop: "15px"
        }}>
            <Flex>
                <Heading>{header}</Heading>
                <Spacer />
                <Text>{time}</Text>
            </Flex>


            <Text style={{ marginTop: "15px", marginBottom: "15px" }}>
                {text}
            </Text>
        </Container >
    )
}

export default NewsItem