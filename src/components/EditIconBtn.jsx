import React from "react";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function EditIconBtn({ ...rest }) {
  const { userProfileData, userID } = useContext(AuthContext);
  const parsedID = parseInt(userID);

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
