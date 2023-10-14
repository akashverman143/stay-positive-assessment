import React, { useState } from "react";
import { Select } from "antd";

const Items = [
  {
    value: "1",
    label: "Male",
  },
  {
    value: "2",
    label: "Female",
  },
  {
    value: "3",
    label: "Transgender",
  },
  {
    value: "4",
    label: "Rather not say",
  },
  {
    value: "5",
    label: "Other",
  },
];

const GenderDroDown = (props) => {
  const { gender, onHandleGender } = props;

  const handleChange = (value) => {
    const gender = Items.find(item => item.value === value.toString()).label;
    onHandleGender(gender);
  }

  return (
    <Select
      defaultValue={gender}
      style={{ width: 120 }}
      onChange={handleChange}
      options={Items}
      size='small'
    />
  );
};

export default GenderDroDown;
