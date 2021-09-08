import React, { useState } from "react";

function Loading({ initialState }) {
  const [state, setState] = useState(initialState);
  return (
    <div className="Loading Modal">
      <div className="content">
        <img src="/assets/nyan-cat.gif" alt="" />
      </div>
    </div>
  );
}

export default Loading;
