import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorFormActionUser,
  changeValueFormUserAction,
  clearAllFormUserAction,
  createUser,
  editUser,
} from "../../../actions/formUserAction";
import Loading from "../../Loading/Loading";

import * as UserSaveStyle from "./UserSave.style";

const UserAction = () => {
  const dispatch = useDispatch();
  const { formData, errorMessage } = useSelector((state) => state.userFormReducer.formActionUser);
  const { isLoading } = useSelector((state) => state.userFormReducer);
  const handleCloseForm = () => {
    dispatch(clearAllFormUserAction());
  };

  const onChangeInput = (e) => {
    dispatch(changeValueFormUserAction({ ...formData, [e.target.name]: e.target.value }));
    dispatch(changeErrorFormActionUser({ ...errorMessage, [e.target.name]: "" }));
  };

  const onClickSubmitForm = (e) => {
    e.preventDefault();
    let error = errorMessage;
    if (!formData.id && (!formData.username || formData.username.length < 5 || formData.username.length > 20)) {
      error = {
        ...error,
        username: "Username must be 5 to 20 characters long",
      };
    }
    if (!formData.name || formData.username.length < 2 || formData.username.length > 30) {
      error = {
        ...error,
        name: "Name user must be 2 to 30 characters long",
      };
    }
    if (formData?.winRateDefault !== "" && (formData?.winRateDefault < 0 || formData.winRateDefault > 100)) {
      error = {
        ...error,
        winRateDefault: "Win rate default must be from 0 to 100",
      };
    }
    //action
    if (Object.values(error).find((error) => error.length > 0)) {
      dispatch(changeErrorFormActionUser(error));
    } else {
      const { id, ...form } = formData;
      const winRateForm = form.winRateDefault !== "" ? +form.winRateDefault : "";
      if (id) {
        dispatch(editUser(id, { name: form.name, winRateDefault: winRateForm }));
      } else {
        dispatch(createUser({ ...form, winRateDefault: winRateForm }));
      }
    }
  };

  return (
    <>
      <UserSaveStyle.FormOverlay onClick={(e) => handleCloseForm()}>
        <UserSaveStyle.Form onClick={(e) => e.stopPropagation()}>
          <h3> {formData?.id ? "Edit" : "Create"} User</h3>
          {!formData?.id && (
            <UserSaveStyle.FormGroup className="form-group">
              <UserSaveStyle.FormLabel>Username</UserSaveStyle.FormLabel>
              <UserSaveStyle.TextInput
                type="text"
                placeholder="Please enter username..."
                name="username"
                value={formData.username}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />
              {errorMessage.username && (
                <UserSaveStyle.FormMessageError>{errorMessage.username}</UserSaveStyle.FormMessageError>
              )}
            </UserSaveStyle.FormGroup>
          )}
          <UserSaveStyle.FormGroup className="form-group">
            <UserSaveStyle.FormLabel>Name</UserSaveStyle.FormLabel>
            <UserSaveStyle.TextInput
              type="text"
              placeholder="Please enter name..."
              name="name"
              value={formData.name}
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
            {errorMessage.name && <UserSaveStyle.FormMessageError>{errorMessage.name}</UserSaveStyle.FormMessageError>}
          </UserSaveStyle.FormGroup>
          <UserSaveStyle.FormGroup className="form-group">
            <UserSaveStyle.FormLabel>
              Win Rate Default (<span style={{ color: "red" }}>%</span>)
            </UserSaveStyle.FormLabel>
            <UserSaveStyle.TextInput
              type="number"
              placeholder="Please enter win rate..."
              name="winRateDefault"
              maxlength="4"
              value={formData.winRateDefault}
              onChange={(e) => {
                onChangeInput(e);
              }}
            />
            {errorMessage.winRateDefault && (
              <UserSaveStyle.FormMessageError>{errorMessage.winRateDefault}</UserSaveStyle.FormMessageError>
            )}
          </UserSaveStyle.FormGroup>
          <UserSaveStyle.FormGroup className="form-group form-group-btn">
            <UserSaveStyle.FormButton
              type="submit"
              bgColor={"#0065f7de"}
              color={"#fff"}
              onClick={(e) => {
                onClickSubmitForm(e);
              }}
            >
              {formData?.id ? "Edit" : "Create"}
            </UserSaveStyle.FormButton>
            <UserSaveStyle.FormButton type="button" onClick={() => handleCloseForm()}>
              Cancel
            </UserSaveStyle.FormButton>
          </UserSaveStyle.FormGroup>
        </UserSaveStyle.Form>
      </UserSaveStyle.FormOverlay>
      <Loading loading={isLoading} />
    </>
  );
};

export default UserAction;
