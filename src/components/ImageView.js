import React, { useState } from "react";
const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

function ImageView({ initialState }) {
  const [state, setState] = useState({ initialState });
  // setState(nextState);
  return (
    <div className="Modal ImageView">
      <div class="content">
        {state ? <img src={`${IMAGE_PATH_PREFIX}${state}`} alt="" /> : ``}
      </div>
    </div>
  );
}

export default ImageView;
