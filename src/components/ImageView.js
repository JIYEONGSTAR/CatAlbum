import React from "react";
const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

function ImageView({ initialState, onClick }) {
  const state = initialState;

  return (
    <div className="Modal ImageView" onClick={onClick}>
      <div class="content">
        <img src={`${IMAGE_PATH_PREFIX}${state}`} alt="" />
      </div>
    </div>
  );
}

export default ImageView;
