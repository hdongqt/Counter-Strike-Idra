import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserDetailStyle from "./UserDetail.style";
import { getUser } from "../../actions/userAction";
import Table from "../../components/common/Table/Table";
import SpinLoading from "./../../components/common/SpinLoading/index";

const UserDetail = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userReducer.userDetail);
  const { isLoading } = useSelector((state) => state.userReducer);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const columns = [
    {
      name: "",
      title: "Team",
      render: (data) => {
        return (
          <span
            style={{
              cursor: "pointer",
              color: `${data?.team_type === "T" ? "blue" : "red"}`,
            }}
            onClick={() => window.open(`/matchs/${data?.match_id}`, "_blank")}
          >
            {data?.team_type === "T" ? "Terrorist" : "Counter-Terrorist"}
          </span>
        );
      },
    },
    {
      name: "result",
      title: "Result",
    },
    {
      name: "",
      title: "Date",
      render: (data) => {
        return <span>{dayjs(data.createdAt).format("HH:mm DD/MM/YYYY")}</span>;
      },
    },
  ];

  return (
    <UserDetailStyle.UserAction>
      <UserDetailStyle.BackToUserButton to="/users">
        <i className="las la-arrow-left"></i>
        <p>Back To Users</p>
      </UserDetailStyle.BackToUserButton>
      {!isLoading && (
        <div>
          <UserDetailStyle.UserActionContainer>
            <UserDetailStyle.UserActionTitle>
              User: {userDetail?.name}{" "}
            </UserDetailStyle.UserActionTitle>
            <UserDetailStyle.UserActionRow>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>Name:</UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.name}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>Username:</UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.username}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
            </UserDetailStyle.UserActionRow>
            <UserDetailStyle.UserActionRow>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>Join:</UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.createdAt &&
                    dayjs(userDetail.createdAt).format("HH:mm DD/MM/YYYY")}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
            </UserDetailStyle.UserActionRow>
            <UserDetailStyle.UserActionRow>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>
                  Amount Match:
                </UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.amountMatch}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>
                  Amount Finish:
                </UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.amountMatchFinish}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
            </UserDetailStyle.UserActionRow>
            <UserDetailStyle.UserActionRow>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>
                  Amount Win:
                </UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.amountWin}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>
                  Amount Lose:
                </UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.amountLose}
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
            </UserDetailStyle.UserActionRow>
            <UserDetailStyle.UserActionRow>
              <UserDetailStyle.UserActionGroup>
                <UserDetailStyle.UserLabel>Win rate:</UserDetailStyle.UserLabel>
                <UserDetailStyle.UserInfo>
                  {userDetail?.winRate} %
                </UserDetailStyle.UserInfo>
              </UserDetailStyle.UserActionGroup>
            </UserDetailStyle.UserActionRow>
          </UserDetailStyle.UserActionContainer>
          <UserDetailStyle.TableContainer>
            <Table columns={columns} payload={{ data: userDetail?.teams }} />
          </UserDetailStyle.TableContainer>
        </div>
      )}
      {isLoading && <SpinLoading />}
    </UserDetailStyle.UserAction>
  );
};

export default UserDetail;
