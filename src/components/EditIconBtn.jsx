import React from "react";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { getTokens } from "../services/localStorage";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function EditIconBtn({ ...rest }) {
  const { localUserID } = getTokens();
  const { userProfileData } = useContext(AuthContext);
  const parsedID = parseInt(localUserID);

  return (
    <>
      {parsedID === userProfileData?.user && (
        <IconButton
          {...rest}
          icon={<EditIcon />}
          style={{ marginLeft: "none" }}
        />
      )}
    </>
  );
}

export default EditIconBtn;
