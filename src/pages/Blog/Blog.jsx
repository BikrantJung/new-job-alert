import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
  Skeleton,
  SkeletonText,
  LinkBox,
  LinkOverlay,
  Stack,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import axiosInstance from "../../services/api";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import { Link as ReactLink } from "react-router-dom";
import axios from "axios";
import ServerErrorSVG from "../../components/ServerErrorSVG";
import { BarLoader } from "react-spinners";
import Loader from "../../components/Loader";
import { BsFacebook } from "react-icons/bs";
const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags ? (
        props.tags?.map((tag) => {
          return (
            <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          );
        })
      ) : (
        <HStack width="100%" height="2rem">
          <Tag width="10%">
            <Skeleton height="10px" />
          </Tag>
          <Tag width="10%">
            <Skeleton height="10px" />
          </Tag>
          <Tag width="10%">
            <Skeleton height="10px" />
          </Tag>
        </HStack>
      )}
    </HStack>
  );
};

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Blog = () => {
  const { blogData, setBlogData, latestBlog, setLatestBlog } =
    useContext(AuthContext);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    async function getBlogData() {
      if (!blogData.length) {
        setShowContent(false);
        try {
          const res = await axios.get("blog/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: null,
            },
          });
          setLatestBlog(res.data.splice(-1));
          setBlogData(res.data);
          setShowContent(true);
          setError(false);
        } catch (error) {
          setShowContent(true);
          setError(true);
        }
      } else {
        setShowContent(true);
      }
    }

    getBlogData();
  }, []);

  return (
    <>
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <>
          <Navbar />
          <Container maxW={"7xl"} p={{ base: "3", md: 10 }} pt={1}>
            <Heading as="h1">Our Blogs</Heading>
            <Box
              marginTop={{ base: "1", sm: "5" }}
              display="flex"
              flexDirection={{ base: "column", sm: "row" }}
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center"
                justifyContent={["center", "flex-start"]}
              >
                <Box
                  width={{ base: "90%", sm: "85%" }}
                  zIndex="2"
                  marginLeft={{ base: "0", sm: "5%" }}
                  marginTop="5%"
                >
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {latestBlog.length ? (
                      <Image
                        borderRadius="lg"
                        src={latestBlog[0]?.blogImage}
                        alt="Blog Image"
                        objectFit="contain"
                      />
                    ) : (
                      <Box
                        width={{ base: "100%", sm: "85%" }}
                        zIndex="2"
                        marginLeft={{ base: "0", sm: "5%" }}
                        height={["45vw", "25vw", "25vw"]}
                      >
                        <Skeleton height="100%" />
                      </Box>
                    )}
                  </Link>
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                  <Box
                    bgGradient={
                      colorMode === "light"
                        ? "radial(orange.600 1px, transparent 1px)"
                        : "radial(orange.300 1px, transparent 1px)"
                    }
                    backgroundSize="20px 20px"
                    opacity="0.4"
                    height="100%"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: "3", sm: "0" }}
              >
                <BlogTags tags={latestBlog[0]?.blogTags} />

                {latestBlog.length ? (
                  <Heading
                    marginTop="1"
                    display={"flex"}
                    alignItems="center"
                    as="div"
                  >
                    <Link>
                      {latestBlog[0]?.blogTitle}
                      <ExternalLinkIcon fontSize={[16]} ml={3} />
                    </Link>
                  </Heading>
                ) : (
                  <Heading
                    marginTop="1"
                    display={"flex"}
                    alignItems="center"
                    as="div"
                    width="100%"
                    my={3}
                  >
                    <Skeleton height="2rem" width="40%" />
                  </Heading>
                )}
                {latestBlog.length ? (
                  <Text
                    fontSize={[12, 13, 14, 15, 16, 17]}
                    noOfLines={[2]}
                    as={"div"}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: latestBlog[0]?.blogDescription,
                      }}
                    />
                  </Text>
                ) : (
                  <Box>
                    <SkeletonText mt="2" noOfLines={5} spacing="2" />
                  </Box>
                )}

                <Text>{latestBlog[0]?.created_at}</Text>
              </Box>
            </Box>
            <Heading as="h2" marginTop="5">
              Latest articles
            </Heading>
            <Divider marginTop="5" />
            <Wrap spacing="30px" marginTop="5" p={4}>
              {blogData.length
                ? blogData.map((item, index) => {
                    return (
                      <LinkBox
                        as={WrapItem}
                        width={{
                          base: "100%",
                          sm: "45%",
                          md: "45%",
                          lg: "30%",
                        }}
                        boxShadow="md"
                        p={3}
                        key={index}
                      >
                        <Box w="100%">
                          <Box borderRadius="lg" overflow="hidden">
                            <Link
                              textDecoration="none"
                              _hover={{ textDecoration: "none" }}
                            >
                              <Image
                                transform="scale(1.0)"
                                src={item.blogImage}
                                alt="Blog image"
                                objectFit="contain"
                                width="100%"
                                transition="0.3s ease-in-out"
                                _hover={{
                                  transform: "scale(1.05)",
                                }}
                              />
                            </Link>
                          </Box>
                          <BlogTags tags={item.blogTags} marginTop="3" />
                          <Heading fontSize="xl" marginTop="2">
                            <LinkOverlay as={ReactLink} to={`${item.id}`}>
                              {item.blogTitle}
                            </LinkOverlay>
                            <ExternalLinkIcon fontSize={[16]} ml={3} />
                          </Heading>
                          <Text>{item.created_at}</Text>
                          <Text
                            fontSize={[12, 13, 14, 15, 16, 17]}
                            noOfLines={[2]}
                            as={"div"}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: blogData[0]?.blogDescription,
                              }}
                            />
                          </Text>
                        </Box>
                      </LinkBox>
                    );
                  })
                : ""}
            </Wrap>
            <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
              <Heading as="h2">What we write about</Heading>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
                pretium condimentum dignissim. Vestibulum ultrices vitae nisi
                sed imperdiet. Mauris quis erat consequat, commodo massa quis,
                feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue
                elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
                pretium condimentum dignissim. Vestibulum ultrices vitae nisi
                sed imperdiet. Mauris quis erat consequat, commodo massa quis,
                feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue
                elit.
              </Text>
              <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
                pretium condimentum dignissim. Vestibulum ultrices vitae nisi
                sed imperdiet. Mauris quis erat consequat, commodo massa quis,
                feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue
                elit.
              </Text>
            </VStack>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Blog;
