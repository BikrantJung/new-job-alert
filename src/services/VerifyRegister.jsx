import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack } from "@chakra-ui/react";
import VerifiedImage from "../images/verify_page.svg";
import VerifySVG from "../components/VerifySVG";
import ServerErrorSVG from "../components/ServerErrorSVG";

function VerifyRegister() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    async function verifyPage() {
      try {
        const res = await axios({
          method: "POST",
          url: `/verify-email/${id}/${token}/`,
        });
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error.response.data);
      }
    }
    verifyPage();
  }, []);

  return (
    <>
      {error ? (
        <ServerErrorSVG />
      ) : (
        <Stack
          sx={{
            height: "100vh",
            width: "100vw",
            bgColor: "rgb(157, 196, 251)",
          }}
          align="center"
          // justify={"center"}
        >
          <VerifySVG />
        </Stack>
      )}
    </>
  );
}

export default VerifyRegister;
