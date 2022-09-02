import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Input, List, ListIcon, ListItem, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

function AddList() {
  const [inputValue, setInputValue] = useState("");

  return (
    <Stack>
      <Stack direction="row">
        <Input
          type="text"
          name="experience"
          placeholder="E.x. 2 years at google as senior engineer"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton icon={<AddIcon />} onClick={addList} disabled={loading} />
      </Stack>
      <Stack direction="row" mt={4}>
        <List spacing={3} w="100%">
          {listData.map((item, index) => {
            return (
              <ListItem
                display={"flex"}
                alignItems="center"
                gap={2}
                w="100%"
                key={index}
              >
                <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
                <Text fontSize={(10, 11, 12, 13, 14, 15)}>{item}</Text>
                <IconButton
                  icon={<DeleteIcon />}
                  fontSize={14}
                  size="sm"
                  marginLeft={"auto"}
                  onClick={() => deleteItem(index)}
                  disabled={loading}
                />
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </Stack>
  );
}

export default AddList;
