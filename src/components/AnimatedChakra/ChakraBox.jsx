import {
    Box,
    Text,
    keyframes,
    Image,
    chakra,
    shouldForwardProp,
  } from "@chakra-ui/react";
  import { motion, isValidMotionProp } from "framer-motion";
  import React from "react";
  
 export const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });