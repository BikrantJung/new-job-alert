import {
  Container,
  Text,
  Stack,
  Box,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import EmployeeImg from "../../images/employee.jpg";
import EmployerImg from "../../images/employer.jpg";
import CustomHeader from "../CustomHeader";

import { FaUserAlt } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
function SignUpComp() {
  return (
    <Box mb={10}>
      <CustomHeader my={[10, 12, 16]}>REGSITER</CustomHeader>

      <Stack
        direction={["column", "column", "row"]}
        position="relative"
        height="300px"
      >
        <CustomBox>OR</CustomBox>
        <Box
          direction={"row"}
          height="100%"
          sx={{
            background: "white",
            backgroundImage: `url(${EmployeeImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          style={{ marginInlineStart: "0", marginTop: "0" }}
          flex={1}
        >
          {/* Employee Box */}
          <Stack
            height="100%"
            bgGradient={"linear(to-r, rgba(0,0,0,0.7), rgba(0,0,0,0.7))"}
            flex={1}
            align="center"
            justify="flex-start"
            p={5}
            gap={2}
          >
            <Icon as={FaUserAlt} fontSize={50} color="blue.400" />
            <CustomHeader color="white" fontSize={28} pb={4}>
              I AM AN EMPLOYEE
            </CustomHeader>
            <Text
              color="white"
              my={4}
              fontSize={[12, 13, 14, 15, 16, 17]}
              maxW="300px"
              textAlign={"center"}
            >
              Register as employee to start searching for jobs
            </Text>
            <Link as={ReactLink} to="/candidate-register">
              <Button
                borderRadius={0}
                colorScheme="green"
                leftIcon={<IoAddCircleOutline />}
              >
                Register as candidate
              </Button>
            </Link>
          </Stack>
        </Box>
        {/* Employer Box */}
        <Box
          direction={"row"}
          height="100%"
          sx={{
            background: "white",
            backgroundImage: `url(${EmployerImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          style={{ marginInlineStart: "0", margin: "0" }}
          flex={1}
        >
          <Stack
            height="100%"
            bgGradient={"linear(to-r, rgba(0,0,0,0.7), rgba(0,0,0,0.7))"}
            flex={1}
            align="center"
            justify="flex-start"
            gap={2}
            p={5}
          >
            <Icon as={FaUserAlt} fontSize={50} color="blue.400" />
            <CustomHeader color="white" fontSize={28} pb={4}>
              I AM AN EMPLOYER
            </CustomHeader>
            <Text
              color="white"
              my={4}
              fontSize={[12, 13, 14, 15, 16, 17]}
              maxW="300px"
              textAlign={"center"}
            >
              Register as employer to start posting jobs, and searching for
              candidates..
            </Text>
            <Link as={ReactLink} to="/company-register">
              <Button
                borderRadius={0}
                colorScheme="green"
                leftIcon={<IoAddCircleOutline />}
              >
                Register as company
              </Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function CustomBox({ children, ...rest }) {
  return (
    <Box
      {...rest}
      height={["30px", "30px", "50px"]}
      width={["30px", "30px", "50px"]}
      sx={{
        display: ["none", "none", "grid"],
        placeItems: "center",
        position: "absolute",
        bgColor: "blue.400",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%) rotate(45deg)",
        borderRadius: "md",
      }}
    >
      <Text color="white" style={{ transform: "rotate(-45deg)" }}>
        {children}
      </Text>
    </Box>
  );
}

export default SignUpComp;
