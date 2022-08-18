import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function VerifyRegister() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function verifyPage() {
      try {
        const res = await axios({
          method: "POST",
          url: `/verify-email/${id}/${token}/`,
        });
        console.log(res);
      } catch (error) {
        console.log(error.response.data)
      }
    }
    verifyPage();
  }, []);

  return <div>Verified</div>;
}

export default VerifyRegister;
