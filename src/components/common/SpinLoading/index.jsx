import styled from "styled-components";

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  .loadingspinner {
    width: 56px;
    height: 56px;
    margin-top: 26px;
    border: 5px solid #eee;
    border-top-color: #3e67ec;
    border-radius: 50%;
    animation: loadingspin 1.4s linear infinite;
  }
  @keyframes loadingspin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const SpinLoading = () => {
  return (
    <LoadingStyle>
      <div className="loadingspinner"></div>
    </LoadingStyle>
  );
};

export default SpinLoading;
