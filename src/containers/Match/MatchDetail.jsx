import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMatch, setTeamWin } from "../../actions/matchAction";
import * as MatchDetailStyle from "./MatchDetail.style";
import WheelName from "../../components/WheelName";
import SpinLoading from "./../../components/common/SpinLoading/index";

const MatchDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { matchDetail } = useSelector((state) => state.matchReducer);
  const { isGetLoading } = useSelector((state) => state.matchReducer);
  console.log(isGetLoading);
  const [listLucky, setListLucky] = useState([]);
  const [teamCT, setTeamCT] = useState([]);
  const [teamT, setTeamT] = useState([]);
  const [resultMatch, setResultMatch] = useState("Pending");
  const [teamWinSelect, setTeamWinSelect] = useState(null);
  const [isOpenLucky, setIsOpenLucky] = useState(false);
  useEffect(() => {
    dispatch(getMatch(id));
  }, [dispatch, id]);

  useEffect(() => {
    const teamCTGet = matchDetail?.teams.find(
      (team) => team.team_type === "CT"
    );
    const teamTGet = matchDetail?.teams.find((team) => team.team_type === "T");
    setTeamCT(teamCTGet);
    setTeamT(teamTGet);
    const teamWin =
      teamCT?.result === "WIN"
        ? "CT"
        : teamCT?.result === "LOSE"
        ? "T"
        : "Pending";
    setResultMatch(teamWin);
    if (teamWin !== "Pending") {
      const list =
        teamWin === "T"
          ? teamCTGet.users.map((item) => item.name)
          : teamTGet.users.map((item) => item.name);
      setListLucky(list);
    }
  }, [matchDetail, teamCT?.result]);

  const handleClickTeamWin = (team) => {
    setTeamWinSelect(team);
  };

  const handleChooseTeamWin = () => {
    dispatch(setTeamWin(id, teamWinSelect));
  };
  const _renderNameOfMatch = () => {
    const nameSplit = matchDetail && matchDetail.name.split(" ");
    const nameDate = nameSplit && nameSplit.length > 0 && nameSplit.pop();
    return (
      <span>
        {nameSplit &&
          `${nameSplit.join(" ")} ${dayjs(nameDate).format(
            "HH:mm DD/MM/YYYY"
          )}`}
      </span>
    );
  };
  return (
    <MatchDetailStyle.MatchAction>
      <MatchDetailStyle.BackToMatchButton to="/matchs">
        <i className="las la-arrow-left"></i>
        <p>Back To Matchs</p>
      </MatchDetailStyle.BackToMatchButton>
      {!isGetLoading ? (
        <MatchDetailStyle.MatchActionContainer>
          <MatchDetailStyle.MatchActionTitle>
            {_renderNameOfMatch()}
          </MatchDetailStyle.MatchActionTitle>
          <MatchDetailStyle.MatchActionRow>
            <MatchDetailStyle.MatchActionGroup>
              <MatchDetailStyle.MatchLabel>Name:</MatchDetailStyle.MatchLabel>
              <MatchDetailStyle.MatchInfo>
                {_renderNameOfMatch()}
              </MatchDetailStyle.MatchInfo>
            </MatchDetailStyle.MatchActionGroup>
            <MatchDetailStyle.MatchActionGroup>
              <MatchDetailStyle.MatchLabel>State:</MatchDetailStyle.MatchLabel>
              <MatchDetailStyle.MatchInfo
                bgColor={
                  matchDetail?.state === "FINISHED" ? "#1FB805" : "#186FEF"
                }
              >
                <span className="state"> {matchDetail?.state}</span>
              </MatchDetailStyle.MatchInfo>
            </MatchDetailStyle.MatchActionGroup>
          </MatchDetailStyle.MatchActionRow>
          <MatchDetailStyle.MatchActionRow>
            <MatchDetailStyle.MatchActionGroup>
              <MatchDetailStyle.MatchLabel>Date:</MatchDetailStyle.MatchLabel>
              <MatchDetailStyle.MatchInfo>
                {matchDetail?.createdAt &&
                  dayjs(matchDetail.createdAt).format("HH:mm DD/MM/YYYY")}
              </MatchDetailStyle.MatchInfo>
            </MatchDetailStyle.MatchActionGroup>
          </MatchDetailStyle.MatchActionRow>
          <MatchDetailStyle.MatchActionRow>
            <MatchDetailStyle.MatchActionGroup>
              <MatchDetailStyle.MatchLabel>
                Description:
              </MatchDetailStyle.MatchLabel>
              <MatchDetailStyle.MatchInfo>
                {matchDetail?.description}
              </MatchDetailStyle.MatchInfo>
            </MatchDetailStyle.MatchActionGroup>
          </MatchDetailStyle.MatchActionRow>
          <MatchDetailStyle.MatchTeamWin>
            <span>Team Win: {resultMatch === "Pending" && resultMatch} </span>
          </MatchDetailStyle.MatchTeamWin>
          <div style={{ display: "flex", alignItems: "start" }}>
            <MatchDetailStyle.MatchTeam>
              <div style={{ margin: "16px 0px" }}>
                <MatchDetailStyle.TeamSelectName
                  isSelect={
                    teamWinSelect ? teamWinSelect === "T" : resultMatch === "T"
                  }
                  onClick={() => handleClickTeamWin("T")}
                >
                  Terrorist
                </MatchDetailStyle.TeamSelectName>
                <MatchDetailStyle.TeamSelectName
                  isSelect={
                    teamWinSelect
                      ? teamWinSelect === "CT"
                      : resultMatch === "CT"
                  }
                  onClick={() => handleClickTeamWin("CT")}
                >
                  Counter-Terrorist
                </MatchDetailStyle.TeamSelectName>
                {teamWinSelect !== resultMatch && teamWinSelect !== null && (
                  <MatchDetailStyle.Button
                    bgColor={"#249c23"}
                    color={"#fff"}
                    onClick={() => handleChooseTeamWin()}
                  >
                    Choose Team Win
                  </MatchDetailStyle.Button>
                )}
              </div>
              <div style={{ display: "flex" }}>
                <MatchDetailStyle.MatchTeamColumn>
                  <MatchDetailStyle.MatchTeamHeader>
                    Terrorist
                  </MatchDetailStyle.MatchTeamHeader>
                  <MatchDetailStyle.MatchTeamList>
                    {teamT?.users &&
                      teamT.users.map((user) => {
                        return <span key={user.id}>{user.name}</span>;
                      })}
                  </MatchDetailStyle.MatchTeamList>
                </MatchDetailStyle.MatchTeamColumn>
                <MatchDetailStyle.MatchTeamColumn>
                  <MatchDetailStyle.MatchTeamHeader>
                    Counter-Terrorist
                  </MatchDetailStyle.MatchTeamHeader>
                  <MatchDetailStyle.MatchTeamList>
                    {teamCT?.users &&
                      teamCT.users.map((user) => {
                        return <span key={user.id}>{user.name}</span>;
                      })}
                  </MatchDetailStyle.MatchTeamList>
                </MatchDetailStyle.MatchTeamColumn>
              </div>
            </MatchDetailStyle.MatchTeam>
          </div>
          {resultMatch !== "Pending" && (
            <div style={{ margin: "10px 0px" }}>
              <MatchDetailStyle.Button
                bgColor={"#186fef"}
                color={"#fff"}
                onClick={() => setIsOpenLucky(true)}
              >
                Lucky Wheel
              </MatchDetailStyle.Button>
            </div>
          )}
          {isOpenLucky && (
            <MatchDetailStyle.MatchWheel>
              <WheelName data={listLucky} setIsOpenLucky={setIsOpenLucky} />
            </MatchDetailStyle.MatchWheel>
          )}
        </MatchDetailStyle.MatchActionContainer>
      ) : (
        <SpinLoading />
      )}
    </MatchDetailStyle.MatchAction>
  );
};

export default MatchDetail;
