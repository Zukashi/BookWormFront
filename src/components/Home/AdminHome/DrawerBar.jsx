import {
  Button,
  Drawer, DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import * as React from 'react';
import {useMemo} from "react";




export const  DrawerBar = () => {
  const {isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('left')
  return (
    <>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>

      </RadioGroup>
      <Button onClick={onOpen}>Menu</Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>

          <DrawerHeader borderBottomWidth='1px'>Basic Drawer  <Button onClick={onClose} className='w-20 absolute right-[-5vw] top-0'>Close</Button></DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>

        </DrawerContent>

      </Drawer>

    </>
  )
}
