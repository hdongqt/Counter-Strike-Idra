import React from "react";
import * as LoadingStyle from "./Loading.style";

const Loading = ({ loading }) => {
  if (!loading) return null;
  return (
    <LoadingStyle.ModalLoading>
      <LoadingStyle.ModalLoadingContainer>
        <div className="loadingspinner"></div>
      </LoadingStyle.ModalLoadingContainer>
    </LoadingStyle.ModalLoading>
  );
};

export default Loading;
