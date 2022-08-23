import React from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import { Link as ReactLink } from "react-router-dom";
import AmazonLogo from "../../images/amazon.png";
import AppleLogo from "../../images/apple.png";
import CokeLogo from "../../images/coke.png";
import { categoryData } from "./CategoryData";
function Categories() {
  console.log("DATA", categoryData);
  return (
    <Box sx={{ py: 6, mb: 3 }}>
      <Center>
        <Heading
          sx={{
            my: 8,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "3%",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "0",
              height: "2px",
              opacity: 1,
              backgroundColor: "green.400",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: "8%",
              left: "55%",
              transform: "translateX(-35%)",
              bottom: "0",
              height: "2px",
              opacity: 1,
              backgroundColor: "green.400",
            },
          }}
        >
          POPULAR CATEGORIES
        </Heading>
      </Center>
      <Stack
        direction={"row"}
        flexWrap="wrap"
        // alignItems="center"
        // justifyContent="center"
        gap={2}
        position="relative"
        py={4}
        px={2}
        bgColor={useColorModeValue("gray.100", "gray.900")}
      >
        {/* Left Job Categories */}
        <Grid
          flex={4}
          templateColumns={["repeat(2,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]}
          gap={2}
          // p={2}
        >
          {categoryData.map((item, index) => {
            return (
              <CategoryCard
                logo={item.img}
                company={item.companyName}
                post={item.jobCategory}
                key={index}
              />
            );
          })}
        </Grid>

        {/* right job categories section */}
        <Stack
          flex={1}
          display={["none", "none", "flex"]}
          bgColor={useColorModeValue("white", "black")}
          rounded="md"
        >
          <Stack boxShadow="md" p={2}>
            <Text
              textAlign={"center"}
              fontWeight="500"
              fontSize={[14, 15, 16, 17, 18, 19, 20]}
              // color={["pink", "red", "blue", "yellow", "green", "white"]}
            >
              Top Employers
            </Text>
            <Stack direction="row" justify={"space-evenly"}>
              <Image src={AmazonLogo} rounded="md" boxSize="50px" />

              <Image src={AppleLogo} rounded="md" boxSize="50px" />

              <Image src={CokeLogo} rounded="md" boxSize="50px" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Categories;
