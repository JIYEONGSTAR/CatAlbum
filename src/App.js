import React, { useState } from "react";
import Breadcrumb from "components/Breadcrumb";
import ImageView from "components/ImageView";
import Nodes from "components/Nodes";
import "css/Styles.css";
import { api } from "api/api";
import { request } from "api/api";
import axios from "axios";
import { useAsync } from "react-async";

// async function getInit() {
//   const rootNodes = await request();
//   // rootNodes[0]
//   // await request().then((result) => {
//   //   result.forEach((item) => rootNodes.push(item));
//   // });
//   // console.log(rootNodes);
//   return rootNodes;
// }

function App() {
  // getInit().then((result) => console.log(result));
  // console.log(getInit().then((result)=>));
  const [state, setState] = useState({
    isRoot: true,
    nodes: [],
    depth: [],
  });
  // const getInit = async () => {
  //   // const n = [];
  //   await request().then((result) => state.nodes.push(result));
  //   // return n;
  // };
  // // setState(...state,nodes:{getInit()});
  // // getInit().then((result) => state.nodes.push(result));
  console.log(state.nodes);
  const onClick = async (e) => {
    // console.log(e);
    if (e.type === "DIRECTORY") {
      console.log("디렉토리다");
      // const nextNodes = await request();
      const nextNodes = await request(e.id);
      setState({
        ...state,
        isRoot: false,
        depth: [...state.depth, e],
        nodes: nextNodes,
      });
    } else if (e.type === "FILE") {
      console.log("파일이다");
    }
  };
  const init = async () => {
    try {
      const rootNodes = await request();
      setState({
        ...state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (err) {
      throw new Error(err);
    }
  };
  // setState((nextState) => {
  //   return { ...nextState };
  // });
  // if (state.isRoot) {
  //   init();
  // }
  if (state.nodes.length === 0) init();
  return (
    <div className="app">
      <Breadcrumb initialState={state} />
      <Nodes initialState={state} onClick={onClick} />
      {/* <ImageView initialState={state.selectedNodeImage} /> */}
    </div>
  );
}

export default App;
