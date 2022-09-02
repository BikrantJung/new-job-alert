import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";

function Faq() {
  return (
    <>
      <Navbar />
      <Stack align="center" gap={3} justify="space-between" height="88vh">
        <Accordion
          allowToggle
          width="50%"
          mt={10}
          height="80%"
          overflow={"auto"}
          fontSize={14}
        >
          <Heading fontSize="lg" my={3}>
            Frequently Asked Questions
          </Heading>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: useColorModeValue("gray.200", "gray.900") }}
              >
                <Box flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: useColorModeValue("gray.200", "gray.900") }}
              >
                <Box flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box bg="gray.300" w="728px" h="90px" margin="0 auto"></Box>
      </Stack>
    </>
  );
}

export default Faq;
