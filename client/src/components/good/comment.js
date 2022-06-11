import { Box, Text } from '@chakra-ui/react';

const Comment = ({ name, text }) => {
    return (
        <Box w="100%">
            <Text color="gray.600" fontSize='18px' as='b'>{name}</Text>
            <Text color="gray.500" fontSize='14px'>
                {text}
            </Text>
        </Box>
    )
}

export default Comment;