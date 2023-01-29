import React from 'react';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Radio,
    RadioGroup,
    Stack, useDisclosure
} from "@chakra-ui/react";

export const DrawerOneComment = (props:any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('bottom')

    return (<>
        <Button colorScheme='blue' onClick={onOpen}>
            Open
        </Button>
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                <DrawerBody>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </DrawerBody>
            </DrawerContent>
        </Drawer></>)
}