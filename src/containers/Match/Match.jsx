import * as MatchStyle from "./Match.style";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeTextSearchMatch,
  deleteMatch,
  getMatchs,
} from "../../actions/matchAction";
import { setFormEditMatch } from "../../actions/formMatchAction";
import dayjs from "dayjs";
import Table from "../../components/common/Table/Table";
import * as message from "../../utils/message";
import MathEdit from "../../components/Form/MatchEdit/MatchEdit";

const Match = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const refSearch = useRef(null);
  const { listMatch, fullTextSearch } = useSelector(
    (state) => state.matchReducer
  );
  const { isLoading } = useSelector((state) => state.matchReducer);
  const { formData } = useSelector(
    (state) => state.matchFormReducer.formEditMatch
  );

  useEffect(() => {
    // Debounce search
    if (refSearch && refSearch.current) {
      clearTimeout(refSearch.current);
    }
    refSearch.current = setTimeout(() => {
      const payload = { search: fullTextSearch, page: 0, limit: 10 };
      dispatch(getMatchs(payload));
    }, 100);
  }, [dispatch, fullTextSearch]);

  const columns = [
    {
      title: "Name",
      width: "300px",
      render: (data) => {
        const nameSplit = data && data.name.split(" ");
        const nameDate = nameSplit && nameSplit.length > 0 && nameSplit.pop();
        return (
          <span>
            {nameSplit &&
              `${nameSplit.join(" ")} ${dayjs(nameDate).format(
                "HH:mm DD/MM/YYYY"
              )}`}
          </span>
        );
      },
    },
    {
      name: "state",
      title: "State",
    },
    {
      title: "Created",
      render: (data) => {
        return <span>{dayjs(data.createdAt).format("HH:mm DD/MM/YYYY")}</span>;
      },
    },
    {
      title: "Team Win",
      render: (data) => {
        const teamWin =
          data.teams.length > 0 &&
          data.teams.find((item) => item.result === "WIN");
        return (
          <span>
            {data.state === "INPROGRESS"
              ? "Pending"
              : teamWin?.team_type === "CT"
              ? "Counter-Terrorist"
              : "Terrorist"}
          </span>
        );
      },
    },
    {
      title: "Action",
      width: "120px",
      actions: [
        {
          icon: "las la-edit",
          color: "#fff",
          bgColor: "#40A9FF",
          onClick: (item) => handelSetFormMatchEdit(item),
        },
        {
          icon: "las la-trash-alt",
          bgColor: "#EC3737",
          color: "#fff",
          onClick: (item) => handleDelete(item),
        },
        {
          icon: "las la-arrow-right",
          onClick: (item) => navigate(`/matchs/${item.id}`),
        },
      ],
    },
  ];

  const handleDelete = (item) => {
    message.deleteConfirm().then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMatch(item.id));
      }
    });
  };

  const handleChangeKeySearch = (value) => {
    dispatch(changeTextSearchMatch(value));
  };

  const handelSetFormMatchEdit = ({ id, name, description }) => {
    const nameSplit = name && name.split(" ");
    dispatch(
      setFormEditMatch({
        id,
        name: nameSplit && nameSplit.length > 0 ? nameSplit[0] : "",
        description,
      })
    );
  };

  const handleChangePage = (page) => {
    const payload = { search: fullTextSearch, page, limit: 10 };
    dispatch(getMatchs(payload));
  };

  return (
    <MatchStyle.Match>
      <h2>Matchs</h2>
      <MatchStyle.MatchContainer>
        <MatchStyle.MatchAction>
          <MatchStyle.MatchButtonCreate
            to="/matchs/create"
            disabled={isLoading}
          >
            Create
          </MatchStyle.MatchButtonCreate>
          <MatchStyle.MatchSearch
            placeholder="Search matches..."
            value={fullTextSearch}
            onChange={(e) => handleChangeKeySearch(e.target.value)}
          />
        </MatchStyle.MatchAction>
        <Table
          columns={columns}
          payload={listMatch}
          loading={isLoading}
          onChangePage={handleChangePage}
          showPagination
        />
      </MatchStyle.MatchContainer>
      {formData && formData.id && <MathEdit />}
    </MatchStyle.Match>
  );
};

export default Match;
