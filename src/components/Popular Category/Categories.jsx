import React from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  Link,
  Stack,
} from "@chakra-ui/react";
import CategoryCard from "./CategoryCard";
import { Link as ReactLink } from "react-router-dom";
function Categories() {
  return (
    <Box sx={{ py: 6, mb: 3 }}>
      <Center>
        <Heading
          sx={{
            my: 3,

            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "3%",
              left: "50%",
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
        mx={10}
        alignItems="center"
        justifyContent="center"
        gap={4}
        position="relative"
        pb={8}
      >
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <Link
          as={ReactLink}
          to="/jobs"
          sx={{ position: "absolute", right: "7%", bottom: 0 }}
        >
          See more...
        </Link>
      </Stack>
    </Box>
  );
}

export default Categories;
