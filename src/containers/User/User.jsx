import * as MatchStyle from "../Match/Match.style";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../components/common/Table/Table";
import * as message from "../../utils/message";
import { changeTextSearchUser, deleteUser, getUsers } from "../../actions/userAction";
import UserAction from "./../../components/Form/UserSave/UserSave";
import { changeValueFormUserAction, openFormCreateUser } from "../../actions/formUserAction";
import { round } from "lodash";

const User = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const refSearch = useRef(null);
  const { listUser, fullTextSearch } = useSelector((state) => state.userReducer);
  const { isOpenForm } = useSelector((state) => state.userFormReducer.formActionUser);
  useEffect(() => {
    // Debounce search
    if (refSearch && refSearch.current) {
      clearTimeout(refSearch.current);
    }
    refSearch.current = setTimeout(() => {
      dispatch(getUsers(fullTextSearch));
    }, 100);
  }, [dispatch, fullTextSearch]);

  const columns = [
    {
      name: "name",
      title: "Name",
    },
    {
      name: "username",
      title: "Username",
    },
    {
      name: "",
      title: "Amount Match",
      render: (data) => {
        return <span>{data.amountMatch}</span>;
      },
    },
    {
      name: "",
      title: "Finish",
      render: (data) => {
        return <span>{data.amountMatchFinish}</span>;
      },
    },
    {
      name: "",
      title: "Win",
      render: (data) => {
        return <span>{data.amountWin}</span>;
      },
    },
    {
      name: "",
      title: "Lose",
      render: (data) => {
        return <span>{data.amountLose}</span>;
      },
    },
    {
      name: "",
      title: "Win Rate",
      render: (data) => {
        return <span>{data.winRate} % </span>;
      },
    },
    {
      title: "Win Rate Default",
      render: (data) => {
        return <span>{data.winRateDefault !== null ? `${round(data.winRateDefault, 2)} %` : ""}</span>;
      },
    },
    {
      name: "",
      title: "Action",
      actions: [
        {
          icon: "las la-edit",
          color: "#fff",
          bgColor: "#40A9FF",
          onClick: (item) => handleSetUserEdit(item),
        },
        {
          icon: "las la-trash-alt",
          bgColor: "#EC3737",
          color: "#fff",
          onClick: (item) => handleDelete(item),
        },
        {
          icon: "las la-arrow-right",
          onClick: (item) => navigate(`/users/${item.id}`),
        },
      ],
    },
  ];
  const handleDelete = (item) => {
    message.deleteConfirm().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(item.id));
      }
    });
  };

  const handleChangeKeySearch = (value) => {
    dispatch(changeTextSearchUser(value));
  };

  const handleSetUserEdit = (user) => {
    dispatch(
      changeValueFormUserAction({
        id: user.id,
        username: user.username,
        name: user.name,
        winRateDefault: user.winRateDefault !== null ? round(user.winRateDefault, 2) : "",
      })
    );
  };

  const handleOpenFormCreate = () => {
    dispatch(openFormCreateUser());
  };

  return (
    <>
      <MatchStyle.Match>
        <h2>Users</h2>
        <MatchStyle.MatchContainer>
          <MatchStyle.MatchAction>
            <MatchStyle.MatchButtonCreate onClick={handleOpenFormCreate}>Create</MatchStyle.MatchButtonCreate>
            <MatchStyle.MatchSearch
              placeholder="Search users..."
              value={fullTextSearch}
              onChange={(e) => handleChangeKeySearch(e.target.value)}
            />
          </MatchStyle.MatchAction>
          <Table columns={columns} data={listUser} />
        </MatchStyle.MatchContainer>
      </MatchStyle.Match>
      {isOpenForm && <UserAction />}
    </>
  );
};

export default User;
