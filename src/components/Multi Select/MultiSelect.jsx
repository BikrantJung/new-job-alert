import {
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { IoChevronDown } from "react-icons/io5";

import React, { useState } from "react";

function MultiSelect(props) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [tagValues, setTagValues] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [tagsOptions, setTagsOptions] = useState(props.values);
  const handleCategoryChange = (e, value) => {
    setSelectedCategory(
      categoryData.filter((item) => {
        return item.name === e.target.value;
      })
    );
  };
  function handleMultiSelect(e, id) {
    setTagValues((prevValues) => {
      return [...prevValues, tagsOptions.find((obj) => obj.id === id)];
    });
    setTagsOptions(
      tagsOptions.filter((obj) => {
        return obj.id !== id;
      })
    );
  }

  // Remove job tags and add to array
  const removeTags = (id) => {
    const removedItem = tagValues.filter((obj) => {
      return obj.id === id;
    });
    setTagsOptions((prevOptions) => {
      return [...prevOptions, ...removedItem];
    });
    setTagValues(
      tagValues.filter((obj) => {
        return obj.id !== id;
      })
    );
  };
  return (
    <Stack>
      <FormControl id="tags">
        <FormLabel>{props.title}</FormLabel>

        <Menu width="100%" placement="bottom">
          <MenuButton as={Button} width="100%" rightIcon={<IoChevronDown />}>
            {props.placeholder}
          </MenuButton>
          <MenuList width="100%">
            {tagsOptions ? (
              tagsOptions.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    width="100%"
                    onClick={(e) => handleMultiSelect(e, item.id)}
                  >
                    {item.value}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled as={Button}>
                No Job Tags Found
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </FormControl>
      <Stack direction="row">
        {tagValues.map((item) => {
          return (
            <Tag key={item.id}>
              <TagLabel>{item.value}</TagLabel>
              <TagRightIcon
                as={CloseIcon}
                fontSize={8}
                _hover={{ cursor: "pointer" }}
                onClick={() => removeTags(item.id)}
              />
            </Tag>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default MultiSelect;
