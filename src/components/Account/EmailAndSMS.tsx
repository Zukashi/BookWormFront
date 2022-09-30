import React from 'react';
import {Button, FormControl, FormLabel, Switch} from "@chakra-ui/react";

export const EmailAndSMS = () => {
  return (<>
    <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Email and SMS</h1>
    <FormControl display='flex' alignItems='center' className='mt-5'>
      <FormLabel htmlFor='email-alerts' mb='0' className='w-[200px]'>
        Email notification:
      </FormLabel>
      <Switch id='email-alerts'  />
    </FormControl>
    <FormControl display='flex' alignItems='center' className='mt-5'>
      <FormLabel htmlFor='email-alerts' mb='0' className='w-[200px]'>
        SMS notification:
      </FormLabel>
      <Switch id='sms-alerts'  />
    </FormControl>
    <Button type={"submit"} mt={"30px"} variant='solid' backgroundColor={'#6366f1'} _active={{
      backgroundColor: '#6366f1',
      color:'#fff',
      transform: 'scale(0.98)',
      borderColor: '#bec3c9',
    }} _hover={{backgroundColor:'#6366f1', color:'#fff'}}>
      Submit
    </Button>
  </>)
}