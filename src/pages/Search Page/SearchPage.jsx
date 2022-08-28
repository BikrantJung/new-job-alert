import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
  Avatar,
  Button,
  Grid,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import UserCard from "./UserCard";
import { SearchIcon } from "@chakra-ui/icons";
function SearchPage(props) {
  const [user, setUser] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("search");

  useEffect(() => {
    const fetchUsers = async () => {
      props.setProgress(20);
      try {
        const res = await axios.get(`profileFilter/?search=${name}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });
        props.setProgress(70);
        console.log(res);
        setUser(res.data);
        props.setProgress(100);
      } catch (error) {
        props.setProgress(100);
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  console.log(user);
  return (
    <>
      <Navbar />
      <Stack align={"center"} justify="flex-start" minH="85vh">
        <Stack align="center" w="50%" my={3}>
          <Heading mb={1}>Search Results</Heading>
        </Stack>
        <Stack
          w="100%"
          flexWrap={"wrap"}
          alignItems="center"
          justifyContent="center"
          gap={3}
          direction="row"
          px={13}
        >
          {user.length
            ? user.map((item) => {
                return (
                  <UserCard
                    key={item.user}
                    avatar={user.avatar}
                    username={item.username}
                    profession={item.profession}
                    skills={item.skills}
                  />
                );
              })
            : ""}
        </Stack>
      </Stack>
    </>
  );
}

export default SearchPage;
