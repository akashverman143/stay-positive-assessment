import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditTwoTone,
  DeleteTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Card, Row, Col, InputNumber, Input, Modal, Button } from "antd";
import capitalize from "lodash/capitalize";
import isEqual from "lodash/isEqual";
import moment from "moment";
import GenderDroDown from "./GenderDropDown";

const { TextArea } = Input;
const { confirm } = Modal;

const CelebCard = (props) => {
  const { celeb, onHandleUserName, onHandleDeleteConfirmation, userName } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const cardData = useSelector((state) => state.cardData);
  const [enable, setEnable] = useState(false);
  const [age, setAge] = useState(celeb.dob);
  const [genderSelected, setGenderSelected] = useState(
    capitalize(celeb.gender)
  );
  const [countryName, setCountryName] = useState(celeb.country);
  const [description, setDescription] = useState(celeb.description);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (cardData) {
        console.log('data called');
        disableSaveButton();
    }
  }, [cardData]);
  const generateAge = (dob) => {
    let age;
    console.log("type", typeof dob);
    if (typeof dob === "string") {
      age = moment().diff(dob, "years");
      return age;
    }
    return dob;
  };

  const handleEdit = () => {
    setEnable(true);
    console.log(generateAge(age), "ageee");
    if (generateAge(age) > 18) {
      onHandleUserName(true, celeb.id);
    }
    const dataToBeSaved = {
      id: celeb.id,
      name: celeb.name,
      age: generateAge(age),
      genderSelected: genderSelected,
      countryName: countryName,
      description: description,
    };
    dispatch({ type: "CARD_DATA_SAVED", data: dataToBeSaved });
  };

  const handleAge = (age) => {
    if (age) {
      setAge(age);
      if (age > 18) {
        onHandleUserName(true, celeb.id);
      } else {
        onHandleUserName(false, celeb.id);
      }
    }
  };

  const handleCountryName = (e) => {
    setCountryName(e.target.value);
  };

  const handleGender = (value) => {
    setGenderSelected(value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    setEnable(false);
    onHandleUserName(false, celeb.id);
    const dataToBeSaved = {
      id: celeb.id,
      name: celeb.name,
      age: generateAge(age),
      genderSelected: genderSelected,
      countryName: countryName,
      description: description,
    };
    dispatch({ type: "CARD_DATA_SAVED", data: dataToBeSaved });
  };

  const handleCancel = () => {
    setEnable(false);
    onHandleUserName(false, celeb.id);
    console.log("cardData", cardData);
    cardData &&
      cardData.length > 0 &&
      cardData.forEach((card) => {
        if (card.id === celeb.id) {
          setAge(card.age);
          setGenderSelected(card.genderSelected);
          setCountryName(card.countryName);
          setDescription(card.description);
        }
      });
  };

  const handleDelete = () => {
    setVisible(true);
    showConfirm();
  };

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this Celebrity?",
      icon: <ExclamationCircleOutlined />,
      //   content: '',
      okText: "Delete",
      okButtonProps: {
        danger: true,
      },
      onOk() {
        handleDeleteConfirmation();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleDeleteConfirmation = () => {
    onHandleDeleteConfirmation(celeb.id);
  };

  const disableSaveButton = () => {
    let flag = true;
    const dataToBeSaved = {
      id: celeb.id,
      name: celeb.name,
      age: generateAge(age),
      genderSelected: genderSelected,
      countryName: countryName,
      description: description,
    };
    console.log("data to be saved", dataToBeSaved, cardData);
    cardData &&
      cardData.length > 0 &&
      cardData.forEach((card) => {
        if (card.id === celeb.id) {
          if (!isEqual(card, dataToBeSaved)) {
            flag = false;
          }
        }
      });
    return flag;
  };

  console.log("card", cardData);
  return (
    <Card
      style={{ width: 480 }}
      bordered={false}
      actions={
        !enable
          ? [
              "",
              <DeleteTwoTone
                key="delete"
                twoToneColor="red"
                onClick={handleDelete}
              />,
              <EditTwoTone
                key="edit"
                twoToneColor="blue"
                onClick={() => handleEdit()}
              />,
            ]
          : [
              "",
              <CloseCircleTwoTone
                key="delete"
                twoToneColor="red"
                onClick={handleCancel}
              />,
              <Button type="text" disabled={disableSaveButton()}>
                <CheckCircleTwoTone
                  key="check"
                  twoToneColor="#52c41a"
                  disabled={true}
                  onClick={handleSave}
                />
              </Button>,
            ]
      }
    >
      <Row>
        <Col span={8}>Age</Col>
        <Col span={8}>Gender</Col>
        <Col span={8}>Country</Col>
      </Row>
      <Row>
        {!enable ? (
          <Col span={8}>
            <strong>{generateAge(age)} Years</strong>
          </Col>
        ) : (
          <Col span={8}>
            <InputNumber
              size="small"
              min={1}
              max={100000}
              defaultValue={generateAge(age)}
              onChange={handleAge}
            />
          </Col>
        )}
        {!enable ? (
          <Col span={8}>
            <strong>{genderSelected}</strong>
          </Col>
        ) : (
          <Col span={8}>
            <GenderDroDown
              gender={genderSelected}
              onHandleGender={handleGender}
            />
          </Col>
        )}
        {!enable ? (
          <Col span={8}>
            <strong>{countryName}</strong>
          </Col>
        ) : (
          <Col span={8}>
            <Input
              size="small"
              placeholder="Basic usage"
              defaultValue={countryName}
              onChange={handleCountryName}
            />
          </Col>
        )}
      </Row>
      <br />
      <Row>Description:</Row>
      <Row>
        {!enable ? (
          <strong>{description}</strong>
        ) : (
          <TextArea
            rows={4}
            defaultValue={description}
            onChange={handleDescription}
          />
        )}
      </Row>
    </Card>
  );
};

export default CelebCard;
