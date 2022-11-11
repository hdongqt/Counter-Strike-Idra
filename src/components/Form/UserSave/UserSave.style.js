import styled from "styled-components";

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #cccccc82;
  transition: all 0.2s linear;
  display: block;
`;

const Form = styled.form`
  width: 700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 9;
  border-radius: 20px;
  overflow-y: auto;
  min-height: calc(50vh);
  padding: 40px 60px;
  transition: 0.2s linear;
  & > h3 {
    text-align: center;
    font-size: 30px;
    padding-bottom: 16px;
  }
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  & + .form-group {
    margin-top: 20px;
  }
  &.form-group-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 40px;
  }
`;

const FormLabel = styled.label`
  font-size: 16px;
  padding-bottom: 8px;
`;

const TextInput = styled.input`
  outline: none;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 8px;
`;

const TextArea = styled.textarea`
  outline: none;
  border: 1px solid #ccc;
  padding: 8px 8px;
  font-size: 16px;
  max-width: 100%;
  min-width: 100%;
`;

const FormButton = styled.button`
  font-size: 16px;
  outline: none;
  padding: 8px 12px;
  min-width: 80px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  border: 1px solid #ccc;
  color: ${(props) => (props.color ? props.color : "#000")};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
  & + button {
    margin-left: 10px;
  }
`;
const FormMessageError = styled.span`
  font-size: 14px;
  color: #c32b30;
  padding-top: 6px;
`;

export { FormOverlay, Form, FormGroup, FormLabel, TextInput, TextArea, FormButton, FormMessageError };
