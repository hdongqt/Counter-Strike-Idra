import styled from "styled-components";

const FormStyle = styled.form`
  width: 800px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  & + .form-group {
    margin-top: 20px;
  }
`;

const FormLabel = styled.label`
  font-size: 18px;
  padding-bottom: 8px;
`;

const TextInput = styled.input.attrs({
  type: "text",
})`
  outline: none;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 4px;
  padding: 8px 8px;
`;

const FormMessageError = styled.span`
  font-size: 14px;
  color: #c32b30;
  padding-top: 4px;
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

const FormTextArea = styled.textarea`
  outline: none;
  border: 1px solid #ccc;
  padding: 8px 8px;
  font-size: 16px;
  max-width: 100%;
  min-width: 100%;
  min-height: 180px;
`;

const FormSelect = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const ButtonGroupStep = styled.div`
  display: flex;
  justify-content: center;
  width: 800px;
  padding: 18px 20px;
  width: 100%;
`;

export {
  TextInput,
  FormGroup,
  FormStyle,
  FormLabel,
  FormButton,
  ButtonGroupStep,
  FormSelect,
  FormMessageError,
  FormTextArea,
};
