import * as FormStyle from "./Form.style";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelCreateMatch,
  changeErrorCreateMatch,
  changeValueForm,
  nextStepForm,
} from "../../actions/formMatchAction";
import { useNavigate } from "react-router-dom";
const StepFirst = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector((state) => state.matchFormReducer.formCreateMatch);
  const { formData } = useSelector((state) => state.matchFormReducer.formCreateMatch);
  const onChange = (e) => {
    dispatch(changeValueForm({ [e.target.name]: e.target.value }));
  };

  const handleCancelCreate = () => {
    dispatch(cancelCreateMatch());
    navigate("/matchs");
  };

  const onClickNextStep = () => {
    //validator
    let error = errorMessage;
    if (!formData.name || formData.name.length < 3 || formData.name.length > 70) {
      error = {
        ...error,
        name: "Name of match must be 3 to 70 characters long",
      };
    }
    if (!formData.description || formData.description.length < 5 || formData.description.length > 150) {
      error = {
        ...error,
        description: "Description of match must be 5 to 150 characters long",
      };
    }
    if (error.name || error.description) {
      dispatch(changeErrorCreateMatch(error));
    } else {
      dispatch(nextStepForm());
    }
  };

  return (
    <>
      <FormStyle.FormStyle>
        <FormStyle.FormGroup className="form-group">
          <FormStyle.FormLabel>Name match:</FormStyle.FormLabel>
          <FormStyle.TextInput type="text" name="name" onChange={(e) => onChange(e)} value={formData.name} />
          {errorMessage.name && <FormStyle.FormMessageError>{errorMessage.name}</FormStyle.FormMessageError>}
        </FormStyle.FormGroup>
        <FormStyle.FormGroup className="form-group">
          <FormStyle.FormLabel>Description:</FormStyle.FormLabel>
          <FormStyle.FormTextArea name="description" onChange={(e) => onChange(e)} value={formData.description} />
          {errorMessage.description && (
            <FormStyle.FormMessageError>{errorMessage.description}</FormStyle.FormMessageError>
          )}
        </FormStyle.FormGroup>
        <FormStyle.ButtonGroupStep>
          <FormStyle.FormButton
            type="button"
            onClick={() => {
              handleCancelCreate();
            }}
            bgColor={"#EC3737"}
            color={"#fff"}
          >
            Cancel
          </FormStyle.FormButton>
          <FormStyle.FormButton type="button" bgColor={"#0065f7de"} color={"#fff"} onClick={() => onClickNextStep()}>
            Next
          </FormStyle.FormButton>
        </FormStyle.ButtonGroupStep>
      </FormStyle.FormStyle>
    </>
  );
};

export default StepFirst;
