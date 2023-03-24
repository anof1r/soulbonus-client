import React from 'react'
import {
    Button,
    Text,
    CardHeader,
    CardBody,
    Image,
    Box,
    Heading,
    Center,
    Input
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { userReducer } from '../store/user/user';

function ClientName() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const setUserName = () => {
        dispatch({
            type: "SET_USERNAME",
            payload: { userName: name},
          })
    }

    return (
        <Box h="100vh" bg="gray.100">
            <Heading
                textAlign="center"
                color="purple.500"
                fontSize="4xl"
                pt="2em"
                mb="2em"
            >
                Enter Your Name
            </Heading>
                <Center h='50vh' display='flex' alignItems='center' color='purple.800'>
                    <Input placeholder='Your name' size='lg' w='50vh' onChange={(e) => setName(e.target.value)} />
                </Center>
                <Button
                    display='flex'
                    m='auto'
                    w='80vw'
                    mb='5vw'
                    h='10vh' s
                    color="white"
                    bg="purple.800"
                    onClick={() => setUserName()}
                >
                    <Link className="linkIsideBtn" to={"/connection"}>Next</Link>
                </Button>
        </Box>
    )
}

export default ClientName