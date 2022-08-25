import { useState } from "react";
import { getTokens } from "../../../services/localStorage";
const { localUserID } = getTokens();
function UpdateApi() {
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e, data) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(`profileSelf/${localUserID}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setLoading(false);
      // setAllowClose(true);
      // setUserProfileData([]);
      // setUserProfileData(res.data);
    } catch (error) {
      // setAllowClose(false);
      // setLoading(false);
      toast({
        title: "Server Error. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }
  return handleSubmit;
}
export default UpdateApi;
