import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMatch, setTeamWin } from "../../actions/matchAction";
import * as MatchDetailStyle from "./MatchDetail.style";

const MatchDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const matchDetail = useSelector((state) => state.matchReducer.matchDetail);
  const teamCT = matchDetail?.teams.find((team) => team.team_type === "CT");
  const teamT = matchDetail?.teams.find((team) => team.team_type === "T");
  const teamWin =
    teamCT?.result === "WIN"
      ? "CT"
      : teamCT?.result === "LOSE"
      ? "T"
      : "Pending";
  const [teamWinSelect, setTeamWinSelect] = useState(null);

  useEffect(() => {
    dispatch(getMatch(id));
  }, [dispatch, id]);

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
          <span>Team Win: {teamWin === "Pending" && teamWin} </span>
        </MatchDetailStyle.MatchTeamWin>
        <div style={{ margin: "16px 0px" }}>
          <MatchDetailStyle.TeamSelectName
            isSelect={teamWinSelect ? teamWinSelect === "T" : teamWin === "T"}
            onClick={() => handleClickTeamWin("T")}
          >
            Terrorist
          </MatchDetailStyle.TeamSelectName>
          <MatchDetailStyle.TeamSelectName
            isSelect={teamWinSelect ? teamWinSelect === "CT" : teamWin === "CT"}
            onClick={() => handleClickTeamWin("CT")}
          >
            Counter-Terrorist
          </MatchDetailStyle.TeamSelectName>
          {teamWinSelect !== teamWin && teamWinSelect !== null && (
            <MatchDetailStyle.Button
              bgColor={"#249c23"}
              color={"#fff"}
              onClick={() => handleChooseTeamWin()}
            >
              Choose Team Win
            </MatchDetailStyle.Button>
          )}
        </div>
        <MatchDetailStyle.MatchTeam>
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
        </MatchDetailStyle.MatchTeam>
      </MatchDetailStyle.MatchActionContainer>
    </MatchDetailStyle.MatchAction>
  );
};

export default MatchDetail;
