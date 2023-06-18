import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import "../style/Todo.css";
import {
  TextInput,
  Button,
  Title,
  Flex,
  Center,
  ScrollArea,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";

const Todo = () => {
  const [userValue, setuserValue] = useState("");
  const [btnclickuservalue, setbtnclickuservalue] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditing, setIsEditing] = useState(null);

  const handleuserValue = (e) => {
    setuserValue(e.target.value);
  };
  const handleBtn = () => {
    setbtnclickuservalue([...btnclickuservalue, userValue]);
    setuserValue("");
  };

  const deleteSingleuser = (id) => {
    console.log(id);
    const updatedList = btnclickuservalue.filter((item, index) => index !== id);
    setbtnclickuservalue(updatedList);
  };

  const clearAll = () => {
    setbtnclickuservalue([]);
  };

  const edit = (index) => {
    const editedValue = btnclickuservalue.find((element, id) => id === index);
    console.log(index);
    console.log(editedValue);
    setToggleBtn(false);
    setuserValue(editedValue);
    setIsEditing(index);
  };

  const handleEditBtn = (isEditing) => {
    const updatedEdited = btnclickuservalue.map((element, id) => {
      if (id === isEditing) {
        return [userValue];
      }
      return element;
    });
    console.log(updatedEdited);
    setuserValue("");
    setbtnclickuservalue(updatedEdited);
    setToggleBtn(true);
  };

  return (
    <>
      <div className="container">
        <div>
          <Title align="center">Welcome To Todo-List</Title>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Flex
            gap="xl"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              placeholder="Todo items.."
              size="lg"
              withAsterisk
              value={userValue}
              onChange={handleuserValue}
              style={{ width: "35%" }}
            />

            {toggleBtn ? (
              <Button
                onClick={() => {
                  handleBtn();
                  notifications.show({
                    title: "Successfully Added",
                    message: "Hey you what's up? 🤥",
                  });
                }}
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                style={{ height: "3.1rem" }}
              >
                Add More
              </Button>
            ) : (
              <Button
                onClick={() => handleEditBtn(isEditing)}
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                style={{ height: "3.1rem" }}
              >
                Edit Text
              </Button>
            )}
          </Flex>
        </div>

        <Center style={{ marginTop: "1.5rem" }}>
          <Flex direction="column">
            <ScrollArea h={250} scrollbarSize={8}>
              <div>
                {btnclickuservalue.map((newUservalue, id) => (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "23rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>{newUservalue}</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "2.5rem",
                      }}
                    >
                      <div onClick={() => deleteSingleuser(id)}>
                        <AiFillDelete
                          style={{
                            color: "red",
                          }}
                          size={35}
                        />
                      </div>
                      <div onClick={() => edit(id)}>
                        <FaEdit
                          style={{
                            color: "green",
                          }}
                          size={35}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div style={{ marginTop: "2rem" }}>
              {btnclickuservalue.length > 0 && (
                <Button onClick={() => clearAll()}>clear all</Button>
              )}
            </div>
          </Flex>
        </Center>
      </div>
    </>
  );
};

export default Todo;
