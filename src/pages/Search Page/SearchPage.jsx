import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import UserCard from "./UserCard";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import SearchNotFound from "../../components/SearchNotFound";
function SearchPage() {
  const [user, setUser] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("search");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`profileFilter/?search=${name}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        });

        setUser(res.data);
      } catch (error) {}
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Navbar />

      {user.length ? (
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
      ) : (
        <SearchNotFound query={name} />
      )}
    </>
  );
}

export default SearchPage;
