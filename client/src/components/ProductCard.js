import { Box, Image, Text, Flex, Button } from "@chakra-ui/react";

const ProductCard = () => {
  const COLOR_MAP = {
    "В наявності": "green.300",
    "Закінчується": "yellow.400",
    "Закінчився": "red.500",
    "Очікується": "teal.400"
  }

  return (
    <Box w="240px" h="340px" m="20px" bg="gray.100" rounded="5px">
      <Image borderRadius="5px 5px 0 0" objectFit="cover" src="http://res.cloudinary.com/hsu9dlm7f/image/upload/v1655167875/avatar/eub3bfo6uoh3lplrvfbi.jpg" alt="" />
      <Box p="5px 10px">
      <Text noOfLines={1} textOverflow="ellipsis" fontSize='12px' maxHeight={24} overflow="hidden" alignSelf="start" color={COLOR_MAP['Закінчується']} >Закінчується</Text>
      <Text noOfLines={1} textOverflow="ellipsis" fontSize='16px'  maxHeight={24} overflow="hidden" alignSelf="start" color="gray.600">Рушники своя лінія 2 рулона</Text>
      
      <Flex justifyContent="space-between" alignItems="center" w="100%" py="7px" px="5px">
        <div className="Price"><Text fontSize="24px" lineHeight="24px" as="del">20₴</Text></div>
        <div className="Cart">
          <Button colorScheme="teal" h="30px">
            Кошик
          </Button>
        </div>
      </Flex>
      </Box>
    </Box>
  )
}

export default ProductCard;