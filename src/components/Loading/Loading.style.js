import styled from "styled-components";

const ModalLoading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgb(83 80 80 / 0%);
  z-index: 12;
  display: block;
  pointer-events: none;
`;

const ModalLoadingContainer = styled.div`
  position: absolute;
  z-index: 113;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .loadingspinner {
    width: 56px;
    height: 56px;
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
export { ModalLoading, ModalLoadingContainer };
