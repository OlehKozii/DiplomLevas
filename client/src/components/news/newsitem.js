import { Container, Heading, Button, Flex, Text, Spacer } from '@chakra-ui/react'
import React from 'react'

const article = { "name": "Чому потрібно їсти овочі" }
const NewsItem = () => {
    return (
        <Container style={{
            minWidth: '75%', border: "solid", margin: "auto", justifyContent: 'center', marginTop: "15px"
        }}>
            <Flex>
                <Heading>{article.name}</Heading>
                <Spacer />
                <Text>2:22 06.10.12</Text>
            </Flex>


            <Text style={{ marginTop: "15px", marginBottom: "15px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, vitae reprehenderit saepe dolor ad deleniti consectetur possimus impedit. Vel, molestiae aut totam, consequatur ullam aliquid ratione repellat praesentium repellendus, placeat voluptas animi? Consectetur placeat exercitationem in reprehenderit repellat minima quam deleniti officiis quibusdam porro doloremque vero laudantium suscipit fugiat atque dolores, eum adipisci iste hic cumque quasi, quas non impedit. Aliquam quis magni esse obcaecati culpa soluta accusamus, dicta accusantium velit tempora, atque voluptatibus eaque assumenda eveniet facere eius ipsam! Saepe, voluptas. Temporibus voluptatem delectus cum deleniti? Animi illum pariatur asperiores tenetur repellat perspiciatis obcaecati natus ducimus explicabo, quisquam ab!</Text>
        </Container >
    )
}

export default NewsItem