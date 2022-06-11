import { extendTheme } from "@chakra-ui/react";
// import { FlexStyles as Flex } from "./components/Flex";

export const Theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'gray.100'
            }
        }
    },
    layerStyles: {
        card: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: '100%',
            padding: '15px',
            transition: 'all 0.2s',
            borderRadius: '10px',
            backgroundColor: 'gray.200',
            _hover: {
                cursor: 'pointer',
                backgroundColor: 'gray.300'
            },
            _active: {
                backgroundColor: 'gray.400'
            }
        }
    }
})