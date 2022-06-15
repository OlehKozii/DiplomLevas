import { extendTheme } from "@chakra-ui/react";
// import { FlexStyles as Flex } from "./components/Flex";

export const Theme = extendTheme({
    colors: {
        gray: {
            100: "#f7f7f8",
            200: "#f0f0f0",
            300: "#e6e6e6",
            400: "#e6e6e6"
        }
    },
    styles: {
        global: {
            body: {
                bg: 'gray.200'
            }
        }
    },
    layerStyles: {
        card: {
            padding: '5px',
            transition: 'all 0.2s',
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