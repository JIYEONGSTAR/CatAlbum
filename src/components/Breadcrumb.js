import React, { useState } from "react";

function Breadcrumb({ initialState }) {
  // const [state, setState] = useState({
  //   initialState,
  // });
  // const { depth, node } = state;

  // setState(nextState);

  // const nextState = { ...state };
  // const nextDepth = { depth }.slice(0, index + 1);
  // onclick = (index) => {
  //   if (index == null) {
  //     setState({ ...state, depth: [], nodex: catche.node });
  //     return;
  //   }
  //   //breadcrumb에서 현재 위치를 누른 경우는 무시함
  //   if (index == { depth }.length - 1) {
  //     return;
  //   }

  //   setState({
  //     ...state,
  //     depth: nextDepth,
  //     nodes: cache[nextDepth[nextDepth.length - 1].id],
  //   });
  // };
  const state = initialState;
  // console.log(initialState);
  // console.log(state.depth[0].name);
  return (
    <div>
      <nav className="Breadcrumb">
        {/* {initialState.map((list)=>)} */}
        <div className="nav-item">
          root {!state.isRoot ? `-${state.depth[0].name} ` : ""}
        </div>
        {/* {state.map((list) => (
          <div>{list.name}</div>
        ))} */}
      </nav>
    </div>
  );
}

export default Breadcrumb;
