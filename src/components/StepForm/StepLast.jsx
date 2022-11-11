import * as FormStyle from "./Form.style";
import { useSelector, useDispatch } from "react-redux";
import { backStepForm, cancelCreateMatch, submitcreateMatchAPI } from "../../actions/formMatchAction";
import { setUserSelect, getUsers } from "../../actions/userAction";
import SelectCustom from "./../common/SelectCustom/SelectCustom";
import Table from "./../common/Table/Table";
import { useEffect, useState } from "react";
import Loading from "./../Loading/Loading";
import { generateTeamAPIFromListUser } from "../../actions/formMatchAction";
import * as message from "../../utils";
import { useNavigate } from "react-router-dom";

const StepLast = () => {
  const columnUserGenerate = [
    {
      name: "name",
      title: "Name",
    },
    {
      title: "Amount Match",
      render: (data) => {
        return <span>{data.amountMatch}</span>;
      },
    },
    {
      title: "Finish",
      render: (data) => {
        return <span>{data.amountMatchFinish}</span>;
      },
    },
    {
      title: "Win",
      render: (data) => {
        return <span>{data.amountWin}</span>;
      },
    },
    {
      title: "Lose",
      render: (data) => {
        return <span>{data.amountLose}</span>;
      },
    },
    {
      title: "Win Rate",
      render: (data) => {
        return <span>{data.winRate} % </span>;
      },
    },
    {
      title: "Win Rate Default",
      width: "150px",
      render: (data) => {
        return <span>{data.winRateDefault !== null ? `${data.winRateDefault} %` : ""}</span>;
      },
    },
  ];

  const columnUserSelect = [
    ...columnUserGenerate,
    {
      name: "",
      title: "Action",
      width: "120px",
      actions: [
        {
          icon: "las la-trash-alt",
          bgColor: "#EC3737",
          color: "#fff",
          onClick: (item) => onClickDeleteUserSelect(item),
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listUser, listUserSelect, teamGenerate } = useSelector((state) => state.matchFormReducer.formCreateMatch);
  const { isLoading } = useSelector((state) => state.matchFormReducer);

  useEffect(() => {
    dispatch(getUsers(""));
  }, [dispatch]);
  const [isFirstOpenListTeam, setIsFirstOpenListTeam] = useState(true);

  useEffect(() => {
    if (isFirstOpenListTeam && listUser.length > 0 && listUserSelect.length === 0) {
      dispatch(setUserSelect(listUser));
      setIsFirstOpenListTeam(false);
    }
  }, [dispatch, listUser, listUserSelect, isFirstOpenListTeam]);

  const { formData } = useSelector((state) => state.matchFormReducer.formCreateMatch);

  const [selectUserSearch, setSelectUserSearch] = useState("SELECT_ALL");

  const onClickNextStep = () => {
    if (!teamGenerate) {
      message.error("Please generate team !");
    } else {
      const listIdTeamCT = teamGenerate.teamCT.map((item) => item.id);
      const listIdTeamT = teamGenerate.teamT.map((item) => item.id);
      const formSubmit = {
        ...formData,
        teamT: listIdTeamT,
        teamCT: listIdTeamCT,
      };
      dispatch(submitcreateMatchAPI(formSubmit, handleCancelCreate));
    }
  };

  const handleCancelCreate = () => {
    dispatch(cancelCreateMatch());
    navigate("/matchs");
  };

  const onChangeSelect = (e) => {
    if (e.target.value === "SELECT_ALL") {
      dispatch(setUserSelect(listUser));
    } else {
      const userFind = listUser.find((user) => user.id === e.target.value);
      if (!listUserSelect.find((user) => user.id === userFind.id)) {
        dispatch(setUserSelect([...listUserSelect, userFind]));
      }
    }
    setSelectUserSearch(e.target.value);
  };

  const onClickDeleteUserSelect = (item) => {
    const newListUserSelect = listUserSelect.filter((user) => user.id !== item.id);
    dispatch(setUserSelect(newListUserSelect));
  };

  const onClickGenerateTeamAPI = () => {
    if (listUserSelect && listUserSelect.length > 1) {
      const listIdSelect = { listUser: listUserSelect.map((item) => item.id) };
      dispatch(generateTeamAPIFromListUser(listIdSelect));
    } else {
      message.error("Please choose total player greater than 2");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10px", width: "250px" }}>
        <SelectCustom
          name="list_user"
          list={[{ id: "SELECT_ALL", name: "Select All" }, ...listUser]}
          keyLabel={"name"}
          keyValue={"id"}
          selectValue={selectUserSearch}
          onChange={onChangeSelect}
        />
        <h3 style={{ padding: "10px 0px" }}>List User</h3>
      </div>
      <div>
        <Table columns={columnUserSelect} data={listUserSelect} />
        <div style={{ padding: "6px 0px" }}>
          <FormStyle.FormButton
            type="button"
            onClick={() => onClickGenerateTeamAPI()}
            isSubmit={true}
            bgColor={"#0065f7de"}
            color={"#fff"}
          >
            Generate Team
          </FormStyle.FormButton>
        </div>
        {teamGenerate && (
          <div>
            <span style={{ padding: "10px 0px", display: "inline-block", fontWeight: "bold" }}>
              Team Counter-Terrorist
            </span>
            <Table columns={columnUserGenerate} data={teamGenerate?.teamCT} />
            <span style={{ padding: "10px 0px", display: "inline-block", fontWeight: "bold" }}>Team Terrorist</span>
            <Table columns={columnUserGenerate} data={teamGenerate?.teamT} />
          </div>
        )}
      </div>
      <FormStyle.ButtonGroupStep style={{ marginLeft: "-40px" }}>
        <FormStyle.FormButton type="button" onClick={() => dispatch(backStepForm())}>
          Back
        </FormStyle.FormButton>
        <FormStyle.FormButton
          type="button"
          bgColor={"#0065f7de"}
          color={"#fff"}
          onClick={() => onClickNextStep()}
          isSubmit={true}
        >
          Submit
        </FormStyle.FormButton>
        <FormStyle.FormButton
          type="button"
          bgColor={"#EC3737"}
          color={"#fff"}
          onClick={() => {
            handleCancelCreate();
          }}
        >
          Cancel
        </FormStyle.FormButton>
      </FormStyle.ButtonGroupStep>
      <Loading loading={isLoading} />
    </>
  );
};

export default StepLast;
