import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorEditMatch,
  setFormEditMatch,
  editMatch,
  clearFormEditMatch,
} from "../../../actions/formMatchAction";
import * as MatchEditStyle from "./MathEdit.style";

const MathEdit = () => {
  const dispatch = useDispatch();
  const { formData, errorMessage } = useSelector((state) => state.matchFormReducer.formEditMatch);

  const handleCloseForm = () => {
    dispatch(clearFormEditMatch());
  };

  const onChangeInput = (e) => {
    const value = e.target.value;
    dispatch(setFormEditMatch({ ...formData, [e.target.name]: value }));
    dispatch(changeErrorEditMatch({ ...errorMessage, [e.target.name]: "" }));
  };

  const onClickCreateForm = (e) => {
    e.preventDefault();
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
    //action
    if (Object.values(error).find((error) => error.length > 0)) {
      dispatch(changeErrorEditMatch(error));
    } else {
      const { id, ...form } = formData;
      dispatch(editMatch(id, form));
    }
  };

  return (
    <MatchEditStyle.FormOverlay onClick={(e) => handleCloseForm()}>
      <MatchEditStyle.Form onClick={(e) => e.stopPropagation()}>
        <h3>Edit Match</h3>
        <MatchEditStyle.FormGroup className="form-group">
          <MatchEditStyle.FormLabel>Name</MatchEditStyle.FormLabel>
          <MatchEditStyle.TextInput
            type="text"
            placeholder="Please enter name..."
            name="name"
            value={formData?.name}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          {errorMessage.name && <MatchEditStyle.FormMessageError>{errorMessage.name}</MatchEditStyle.FormMessageError>}
        </MatchEditStyle.FormGroup>
        <MatchEditStyle.FormGroup className="form-group">
          <MatchEditStyle.FormLabel>Description</MatchEditStyle.FormLabel>
          <MatchEditStyle.TextArea
            rows={6}
            placeholder="Please enter description..."
            name="description"
            value={formData.description}
            onChange={(e) => {
              onChangeInput(e);
            }}
          />
          {errorMessage.description && (
            <MatchEditStyle.FormMessageError>{errorMessage.description}</MatchEditStyle.FormMessageError>
          )}
        </MatchEditStyle.FormGroup>
        <MatchEditStyle.FormGroup className="form-group form-group-btn">
          <MatchEditStyle.FormButton
            type="submit"
            isSubmit={true}
            onClick={(e) => {
              onClickCreateForm(e);
            }}
          >
            Edit
          </MatchEditStyle.FormButton>
          <MatchEditStyle.FormButton type="button" onClick={() => handleCloseForm()}>
            Cancel
          </MatchEditStyle.FormButton>
        </MatchEditStyle.FormGroup>
      </MatchEditStyle.Form>
    </MatchEditStyle.FormOverlay>
  );
};

export default MathEdit;
