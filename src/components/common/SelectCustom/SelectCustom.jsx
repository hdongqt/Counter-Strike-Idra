import React from "react";
import Select from "react-select";
import styled from "styled-components";

const FormOptionLabel = styled.div`
  display: flex;
  & > img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const SelectCustom = ({ name, useIcon, list, selectValue, keyLabel, keyValue, onChange, onKeyDown }) => {
  const listSelect = !list
    ? []
    : list.map((item) => {
        return {
          label: item[keyLabel],
          value: item[keyValue],
        };
      });
  return (
    <Select
      options={listSelect}
      onKeyDown={(e) => onKeyDown(e.target.value)}
      value={listSelect.find((item) => item.value === selectValue) || listSelect[0]}
      onChange={(item) => onChange({ target: { name: name, value: item.value } })}
      formatOptionLabel={(item) => {
        if (useIcon) {
          return (
            <FormOptionLabel>
              <img src={item.icon} alt={"icon" + item.value} />
              <span>{item.label}</span>
            </FormOptionLabel>
          );
        }
        return <span>{item.label}</span>;
      }}
    />
  );
};

export default SelectCustom;
