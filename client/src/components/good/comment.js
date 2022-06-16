import { Box, Text, Flex } from '@chakra-ui/react';

const Comment = ({ name, text, time, grade }) => {
    const date = new Date(time);

    function getGradeColor(value) {
        switch (true) {
            case (value >= 75):
                return 'green';
            case (value >= 50):
                return 'teal';
            case (value >= 25):
                return 'yellow';
            case (value >= 0):
                return 'red';
            default:
                return 'teal';
        }
    }

    return (
        <Box w="100%">
            <Flex justifyContent='space-between'>
                <Text color="gray.600" fontSize='18px' as='b'>{name}</Text>
                <Text color="gray.400" fontSize='14px'>{`${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
            </Flex>
            <Flex justifyContent='space-between'>
                <Text color="gray.500" fontSize='16px' maxWidth="80%">
                    {text}
                </Text>
                <Text color={getGradeColor(grade)} fontSize='35px' mx="10px">
                    {grade}%
                </Text>
            </Flex>
        </Box>
    )
}

export default Comment;