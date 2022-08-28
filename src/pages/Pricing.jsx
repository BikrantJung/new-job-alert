import { useEffect, useState, useContext } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Wrap,
  Avatar,
  Flex,
  Center,
  ModalBody,
  IconButton,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { getTokens } from "../services/localStorage";
import Navbar from "../components/Navbar/Navbar";
function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function Pricing(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);
  const [pricingData, setPricingData] = useState([]);
  const [pricingID, setPricingID] = useState();
  const [pricingDetail, setPricingDetail] = useState({});
  const [khaltiResponse, setKhaltiResponse] = useState({});
  const [error, setError] = useState(false);
  const { accessToken } = getTokens();
  const { userSubscribed, isExpired } = useContext(AuthContext);
  const toast = useToast();
  useEffect(() => {
    async function getPricingData() {
     
      try {
        const res = await axios({
          method: "GET",
          url: "membership/",
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        const removedData = res.data.shift();
        setPricingData(res.data);
      
        console.log(res);
       
      } catch (error) {
      
        console.log(error);
      }
    }

    getPricingData();
  }, []);

  const checkUserVerification = async (e, id) => {
    if (accessToken) {
      try {
        const data = {
          membership_type: null,
          amount: null,
          token: null,
        };

        const res = await axios.post("subscribe/", data);
        setModalOpen(true);
        setPricingDetail(pricingData.find((obj) => obj.id === id));
      } catch (error) {
        if (error.response.data.msg) {
          toast({
            title: "You are not verified. Check inbox for verification.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    } else {
      toast({
        title: "You are not logged in",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    // setModalOpen(true);
    // setPricingDetail(pricingData.find((obj) => obj.id === id));
  };
  const modalClose = () => {
    setModalOpen(false);
  };

  const handlePayment = () => {
    let config = {
      // replace this key with yours
      publicKey: "test_public_key_4b33f92a102b4901aab413faf63178d9",
      productIdentity: "1234567890",
      productName: "Dragon",
      productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
      eventHandler: {
        async onSuccess(payload) {
          // hit merchant api for initiating verfication
          // setKhaltiResponse(payload);
          try {
            const res = await axios({
              method: "POST",
              url: "subscribe/",
              data: {
                membership_type: pricingDetail.membership_type,
                amount: payload.amount,
                token: payload.token,
              },
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
            });
          } catch (error) {
            toast({
              title: "Server error. Please try again later.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
        },
        // onError handler is optional
        onError(error) {
          // handle errors
          console.log(error);
        },
        onClose() {},
      },
      paymentPreference: [
        "KHALTI",
        // "EBANKING",
        // "MOBILE_BANKING",
        // "CONNECT_IPS",
        // "SCT",
      ],
    };
    if (accessToken) {
      setModalOpen(false);
      let checkout = new KhaltiCheckout(config);
      checkout.show({ amount: 10000 });
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    if (error) {
      toast({
        title: "You're not logged in",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [error]);
  return (
    <>
      <Navbar />

      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Plans that fit your need
          </Heading>
          <Text fontSize="lg" color={"gray.500"}>
            Start with 7-day free trial. No credit card needed. Cancel at
            anytime.
          </Text>
        </VStack>
        <Modal isOpen={modalOpen} onClose={modalClose} isCentered>
          <ModalOverlay />
          <ModalContent bgColor="transparent" boxShadow="none">
            <ModalBody>
              <Stack direction={"row"} justify="space-evenly">
                <Stack align={"center"}>
                  <Avatar
                    _hover={{ cursor: "pointer" }}
                    src="https://play-lh.googleusercontent.com/Xh_OlrdkF1UnGCnMN__4z-yXffBAEl0eUDeVDPr4UthOERV4Fll9S-TozSfnlXDFzw"
                    onClick={handlePayment}
                  />
                  {/* <Button
                  _hover={{
                    bgColor: useColorModeValue("gray.400", "gray.700"),
                  }}
                  bgColor={useColorModeValue("gray.300", "gray.600")}
                  onClick={handlePayment}
                >
                  Khalti
                </Button> */}
                </Stack>
                <Stack align={"center"}>
                  <Avatar src="https://esewa.com.np/common/images/esewa-icon-large.png" />
                  {/* <Button
                  _hover={{
                    bgColor: useColorModeValue("gray.400", "gray.700"),
                  }}
                  bgColor={useColorModeValue("gray.300", "gray.600")}
                >
                  eSewa
                </Button> */}
                </Stack>
                <Stack align={"center"}>
                  <Avatar />
                  {/* <Button
                  _hover={{
                    bgColor: useColorModeValue("gray.400", "gray.700"),
                  }}
                  bgColor={useColorModeValue("gray.300", "gray.600")}
                >
                  Stripe
                </Button> */}
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Stack
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          {pricingData.length ? (
            pricingData?.map((item) => {
              return (
                <PriceWrapper key={item.id}>
                  <Box py={4} px={12}>
                    <Text fontWeight="500" fontSize="2xl">
                      {item.membership_type}
                    </Text>
                    <Text color="gray.500">
                      {item.duration} {item.duration > 1 ? "months" : "month"}{" "}
                      package
                    </Text>
                    <HStack justifyContent="center">
                      <Text fontSize="3xl" fontWeight="600">
                        $
                      </Text>
                      <Text fontSize="5xl" fontWeight="900">
                        {Math.floor(item.price)}
                      </Text>
                    </HStack>
                  </Box>
                  <VStack
                    // bg={useColorModeValue("gray.50", "gray.700")}
                    py={4}
                    borderBottomRadius={"xl"}
                  >
                    <List spacing={3} textAlign="start" px={12}>
                      {item?.description?.map((item) => {
                        return (
                          <ListItem
                            key={item}
                            display="flex"
                            alignItems={"center"}
                          >
                            <ListIcon as={FaCheckCircle} color="green.500" />
                            <Text>{item}</Text>
                          </ListItem>
                        );
                      })}
                    </List>
                    <Box w="80%" pt={7}>
                      <Button
                        w="full"
                        colorScheme="red"
                        onClick={(e) => checkUserVerification(e, item.id)}
                        disabled={userSubscribed}
                        variant={userSubscribed ? null : "outline"}
                      >
                        {userSubscribed ? "Subscribed" : "Subscribe now"}
                      </Button>
                    </Box>
                  </VStack>
                </PriceWrapper>
              );
            })
          ) : (
            <Stack
              // display="flex"
              // direction="row"
              direction={{ base: "column", md: "row" }}
              textAlign="center"
              justify="center"
              // align="center"
              spacing={4}
              p={10}
              // bgColor="blue"
              width="100%"
            >
              <Box flex="1" px={{ base: "20", md: "1" }}>
                <Skeleton height="20rem" />
              </Box>
              <Box flex="1" px={{ base: "20", md: "1" }}>
                <Skeleton height="20rem" />
              </Box>
              <Box flex="1" px={{ base: "20", md: "1" }}>
                <Skeleton height="20rem" />
              </Box>
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
}
