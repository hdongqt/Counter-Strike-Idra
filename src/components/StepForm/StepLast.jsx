import * as FormStyle from "./Form.style";
import { useSelector, useDispatch } from "react-redux";
import domtoimage from "dom-to-image-more";
import { saveAs } from "file-saver";
import {
  addUserPro,
  backStepForm,
  cancelCreateMatch,
  deleteUserPro,
  submitcreateMatchAPI,
} from "../../actions/formMatchAction";
import { setUserSelect, getUsers } from "../../actions/userAction";
import SelectCustom from "./../common/SelectCustom/SelectCustom";
import Table from "./../common/Table/Table";
import { useEffect, useRef, useState } from "react";
import Loading from "./../Loading/Loading";
import { generateTeamAPIFromListUser } from "../../actions/formMatchAction";
import * as message from "../../utils";
import { useNavigate } from "react-router-dom";

const StepLast = () => {
  const ref = useRef(null);
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
        return (
          <span>
            {data.winRateDefault !== null ? `${data.winRateDefault} %` : ""}
          </span>
        );
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
          icon: "las la-plus-circle",
          bgColor: "#06b33f",
          color: "#fff",
          onClick: (item) => handleAddUserPro(item),
        },
        {
          icon: "las la-trash-alt",
          bgColor: "#EC3737",
          color: "#fff",
          onClick: (item) => onClickDeleteUserSelect(item),
        },
      ],
    },
  ];

  const columnUserPro = [
    {
      name: "name",
      title: "Name",
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
        return (
          <span>
            {data.winRateDefault !== null ? `${data.winRateDefault} %` : ""}
          </span>
        );
      },
    },
    {
      name: "",
      title: "Action",
      width: "120px",
      actions: [
        {
          icon: "las la-trash-alt",
          bgColor: "#EC3737",
          color: "#fff",
          onClick: (item) => handleDeleteUserPro(item.id),
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listUser, listUserSelect, teamGenerate, listUserPro } = useSelector(
    (state) => state.matchFormReducer.formCreateMatch
  );
  const { isLoading } = useSelector((state) => state.matchFormReducer);

  useEffect(() => {
    dispatch(getUsers(""));
  }, [dispatch]);
  const [isFirstOpenListTeam, setIsFirstOpenListTeam] = useState(true);

  useEffect(() => {
    if (
      isFirstOpenListTeam &&
      listUser.length > 0 &&
      listUserSelect.length === 0
    ) {
      dispatch(setUserSelect(listUser));
      setIsFirstOpenListTeam(false);
    }
  }, [dispatch, listUser, listUserSelect, isFirstOpenListTeam]);

  const { formData } = useSelector(
    (state) => state.matchFormReducer.formCreateMatch
  );

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
    const newListUserSelect = listUserSelect.filter(
      (user) => user.id !== item.id
    );
    dispatch(setUserSelect(newListUserSelect));
  };

  const onClickGenerateTeamAPI = () => {
    if (listUserSelect && listUserSelect.length > 1) {
      const data = {
        listUser: listUserSelect.map((item) => item.id),
        listUserPro: listUserPro.map((item) => item.id),
      };
      dispatch(generateTeamAPIFromListUser(data));
    } else {
      message.error("Please choose total player greater than 2");
    }
  };

  const handleCaptureTeam = async () => {
    try {
      const dataUrl = await domtoimage.toPng(ref.current);
      const date = new Date();
      const name = date.getTime();
      saveAs(dataUrl, `${name}.png`);
    } catch (e) {
      await message.error("Cannot capture!");
    }
  };

  const handleAddUserPro = (user) => {
    if (!listUserPro.find((item) => item.id === user.id)) {
      dispatch(addUserPro(user));
    }
  };
  const handleDeleteUserPro = (id) => {
    dispatch(deleteUserPro(id));
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
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Table columns={columnUserSelect} data={listUserSelect} />
        </div>
        {listUserPro && listUserPro.length > 0 && (
          <>
            <span>List of pro users</span>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table columns={columnUserPro} data={listUserPro} />
            </div>
          </>
        )}
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
          <>
            <div
              ref={ref}
              style={{ backgroundColor: "#fff", padding: "16px 10px" }}
            >
              <span
                style={{
                  padding: "10px 0px",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Team Counter-Terrorist
              </span>
              <Table columns={columnUserGenerate} data={teamGenerate?.teamCT} />
              <span
                style={{
                  padding: "10px 0px",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                Team Terrorist
              </span>
              <Table columns={columnUserGenerate} data={teamGenerate?.teamT} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px 0px",
              }}
            >
              <FormStyle.FormButton
                type="button"
                onClick={() => handleCaptureTeam()}
                isSubmit={true}
                bgColor={"#1a851a"}
                color={"#fff"}
              >
                Download Capture
              </FormStyle.FormButton>
            </div>
          </>
        )}
      </div>
      <FormStyle.ButtonGroupStep>
        <FormStyle.FormButton
          type="button"
          onClick={() => dispatch(backStepForm())}
        >
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
